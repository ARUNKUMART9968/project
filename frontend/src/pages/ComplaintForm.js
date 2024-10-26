import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'; // Custom functions for notifications
import './ComplaintForm.css'; // Import the CSS for styling

function ComplaintForm() {
  const [complaintInfo, setComplaintInfo] = useState({
    typeOfComplaint: '',
    description: '',
    trainNumber: '',
    ticketNumber: '',
    uploadedImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintInfo({
      ...complaintInfo,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setComplaintInfo({
      ...complaintInfo,
      uploadedImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { typeOfComplaint, description, trainNumber, ticketNumber, uploadedImage } = complaintInfo;

    if (!typeOfComplaint || !description || !trainNumber || !ticketNumber) {
      return handleError('All fields except the image are required.');
    }

    try {
      const formData = new FormData();
      formData.append('typeOfComplaint', typeOfComplaint);
      formData.append('description', description);
      formData.append('trainNumber', trainNumber);
      formData.append('ticketNumber', ticketNumber);
      if (uploadedImage) {
        formData.append('uploadedImage', uploadedImage);
      }

      const response = await fetch('http://localhost:8080/auth/complaintform', {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess('Complaint submitted successfully!');
        // Refresh the page after successful submission
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Delay for a moment to ensure the success toast is visible
      } else {
        handleError(result.message || 'Failed to submit complaint.');
      }
    } catch (err) {
      console.log(err);
      handleError('An error occurred while submitting the complaint.');
    }
  };

  return (
    <div className='homepage-container'>
    <div className="form-container">
      <div className="form-image">
        <img src="/railmadad.webp" alt="Rail Madad Helpline" />
      </div>

      <div className="form-content">
        <h1>Submit Your Rail Complaint</h1>

        <p><b>We are here to help you. Please provide details of your issue below and we will get back to you as soon as possible.</b></p>

        <form onSubmit={handleSubmit}>
          {/* Grouping complaint type and description */}
          <div className="form-section">
            <h2>Complaint Details</h2>
            <div className="form-group">
              <label htmlFor="typeOfComplaint">Complaint Type</label>
              <select
                name="typeOfComplaint"
                onChange={handleChange}
                value={complaintInfo.typeOfComplaint}
                required
              >
                <option value="">-- Select Complaint Type --</option>
                <option value="Late Train">Late Train</option>
                <option value="Poor Service">Poor Service</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Safety Issue">Safety Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Complaint Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                placeholder="Please describe your issue in detail..."
                value={complaintInfo.description}
                required
              />
            </div>
          </div>

          {/* Grouping train and ticket information */}
          <div className="form-section">
            <h2>Travel Details</h2>
            <div className="form-group">
              <label htmlFor="trainNumber">Train Number</label>
              <input
                type="number"
                name="trainNumber"
                onChange={handleChange}
                placeholder="Enter your train number..."
                value={complaintInfo.trainNumber}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ticketNumber">Ticket Number</label>
              <input
                type="number"
                name="ticketNumber"
                onChange={handleChange}
                placeholder="Enter your ticket number..."
                value={complaintInfo.ticketNumber}
                required
              />
            </div>
          </div>

          {/* Upload section */}
          <div className="form-section">
            <h2>Additional Information (Optional)</h2>
            <div className="form-group">
              <label htmlFor="uploadedImage">Upload Image</label>
              <input
                type="file"
                name="uploadedImage"
                accept=".jpg, .jpeg"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button type="submit">Submit Complaint</button>
        </form>
      </div>

      <ToastContainer />
    </div>
    </div>

  );
}

export default ComplaintForm;