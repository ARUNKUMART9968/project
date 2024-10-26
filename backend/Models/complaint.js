const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    typeOfComplaint: {
        type: String,
        required: true,
        enum: ['Late Train', 'Poor Service', 'Cleanliness', 'Safety Issue', 'Other']  // Dropdown options
    },
    description: {
        type: String,
        required: true
    },
    trainNumber: {
        type: Number,
        required: true
    },
    ticketNumber: {
        type: Number,
        required: true
    },
    inquiryDate: {
        type: Date,
        default: Date.now
    },
    uploadedImage: {
        type: String,
        validate: {
            validator: function(value) {
                // Only allow jpg/jpeg extensions
                return /\.(jpg|jpeg)$/i.test(value);
            },
            message: props => `${props.value} is not a valid image. Only .jpg or .jpeg files are allowed.`
        },
        required: false
    },
    priority:{
        type : Number,
        default: null
    }
});

const ComplaintModel = mongoose.model('Complaints', complaintSchema);
module.exports = ComplaintModel;
