const complaintModel = require("../Models/complaint"); 

const submitComplaint = async (req, res) => {
    try {
        const { typeOfComplaint, description, trainNumber, ticketNumber, uploadedImage } = req.body;
        if (!typeOfComplaint || !description || !trainNumber || !ticketNumber) {
            return res.status(400).json({
                message: "All fields (Type of Complaint, Description, Train Number, Ticket Number) are required",
                success: false
            });
        }
        const newComplaint = new complaintModel({
            typeOfComplaint,
            description,
            trainNumber,
            ticketNumber,
            uploadedImage // Optional: validate the image extension if needed
        });

        // Save the complaint to the database
        await newComplaint.save();

        // Respond with success
        res.status(201).json({
            message: "Complaint submitted successfully",
            success: true
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};
const getComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find()
            .sort({ priority: -1 }) // Sort by priority in descending order
            .exec();

        res.status(200).json({ complaints });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch complaints',
            error: err.message
        });
    }
};


module.exports = {
    submitComplaint,
    getComplaints
};