// utils.js or wherever you have these functions
import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',  
        style: {
            marginTop: '60px', 
            width: '400px',    
            padding: '20px',   
            fontSize: '16px',  
        }
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',  // Display below navbar
        style: {
            marginTop: '60px', // Adjust this based on your navbar height
            width: '400px',    // Set a specific width
            padding: '20px',   // Increase padding for better spacing
            fontSize: '16px',  // Adjust font size if needed
        }
    });
};
