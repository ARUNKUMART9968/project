import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';
import './Result.css'; // Include the CSS for styling

function Result() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchComplaints = async () => {
        try {
            const url = 'http://localhost:8080/auth/complaints';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch complaints');
            }

            const result = await response.json();
            setComplaints(result.complaints || []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            handleError(err.message);
        }
    };

    useEffect(() => {
        fetchComplaints(); // Initial fetch when the component mounts

        // Set interval to refresh complaints every 10 seconds (10000 ms)
        const intervalId = setInterval(() => {
            fetchComplaints(); // Fetch complaints again
        }, 10000); // 10 seconds interval

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    // Function to determine cell background color based on priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 5: // Urgent and Important
                return '#FF0000'; // Red
            case 4: // Important but Not Urgent
                return '#FFA500'; // Orange
            case 3: // Urgent but Not Important
                return '#FFFF00'; // Yellow
            case 2: // Important, Medium Priority
                return '#008000'; // Green
            case 1: // Not Important and Not Urgent
                return '#0000FF'; // Blue
            case 0: // Low Priority
                return '#ADD8E6'; // Light Blue
            default:
                return '#FFFFFF'; // White for N/A
        }
    };

    return (
        <div className='homepage-container'>
        <div className="result-container">
            <h1>Complaints</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : complaints.length > 0 ? (
                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Type of Complaint</th>
                            <th>Description</th>
                            <th>Train Number</th>
                            <th>Ticket Number</th>
                            <th>Inquiry Date</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{complaint.typeOfComplaint}</td>
                                <td>{complaint.description}</td>
                                <td>{complaint.trainNumber}</td>
                                <td>{complaint.ticketNumber}</td>
                                <td>{new Date(complaint.inquiryDate).toLocaleDateString()}</td>
                                <td style={{ backgroundColor: getPriorityColor(complaint.priority) }}>
                                    {complaint.priority !== null ? complaint.priority : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No complaints found</p>
            )}
            <ToastContainer />
        </div>
        </div>
    );
}

export default Result;
