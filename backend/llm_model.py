import pymongo
import datetime

# Replace with your MongoDB connection details
client = pymongo.MongoClient("mongodb://localhost:8080/")  # Adjust host and port if needed
db = client["project 0"]  # Replace with your database name
collection = db["complaints"]  # Replace with your collection name

# Define the schema using a dictionary
schema = {
    "typeOfComplaint": {
        "type": str,
        "required": True,
        "enum": ["Late Train", "Poor Service", "Cleanliness", "Safety Issue", "Other"],
    },
    "description": {"type": str, "required": True},
    "trainNumber": {"type": int, "required": True},
    "ticketNumber": {"type": int, "required": True},
    "inquiryDate": {"type": datetime.datetime, "default": datetime.datetime.now},
    "uploadedImage": {
        "type": str,
        "required": False,
        "validate": {
            "validator": lambda value: bool(re.match(r"\.(jpg|jpeg)$", value, flags=re.IGNORECASE)),
            "message": "Invalid image. Only .jpg or .jpeg files allowed.",
        },
    },
    "priority": {"type": int, "default": None},
}


# Helper function to validate documents against the schema (optional)
def validate_document(document):
    for field, field_schema in schema.items():
        if field_schema.get("required") and field not in document:
            raise ValueError(f"Field '{field}' is required but missing.")
        if field in document and type(document[field]) != field_schema["type"]:
            raise TypeError(f"Field '{field}' has invalid type. Expected {field_schema['type']}.")


# Function to create a complaint document
def create_complaint(complaint):
    validate_document(complaint)  # Optional validation
    result = collection.insert_one(complaint)
    return result.inserted_id


# Function to get all complaints (or filter by query)
def get_complaints(query=None):
    if query:
        return list(collection.find(query))
    else:
        return list(collection.find())


# Function to get a complaint by ID
def get_complaint_by_id(complaint_id):
    return collection.find_one({"_id": complaint_id})


# Function to update a complaint
def update_complaint(complaint_id, update_data):
    validate_document(update_data)  # Optional validation
    result = collection.update_one({"_id": complaint_id}, {"$set": update_data})
    return result.modified_count


from llm.py import inference
for i in get_complaints():
    input = i["description"]
    output = inference(input)
    update_data = {"priority": output}
    updated_count = update_complaint(i["complaint_id"], update_data)