const Joi = require('joi');
const multer = require('multer');

// Set up multer to handle file uploads
const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/jpg|jpeg/i)) {
            cb(new Error("Only JPG/JPEG images are allowed!"));
        } else {
            cb(null, true);
        }
    }
}).single('uploadedImage'); // Only handle one image at a time

// Joi validation schema
const complaintValidationSchema = Joi.object({
    typeOfComplaint: Joi.string().valid('Late Train', 'Poor Service', 'Cleanliness', 'Safety Issue', 'Other').required(),
    description: Joi.string().required(),
    trainNumber: Joi.number().required(),
    ticketNumber: Joi.number().required(),
    inquiryDate: Joi.date().optional(),
    // Image is optional, handled separately
});

// Complaint validation middleware
const complaintValidation = (req, res, next) => {
    // First, handle the file upload using multer
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        // Now, validate the other fields in the form
        const { error } = complaintValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", error: error.details[0].message });
        }

        // If everything is valid, proceed to the next middleware or controller
        next();
    });
};

module.exports = {
    complaintValidation
};
