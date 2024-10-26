import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // If token exists, user is authenticated
        if (token) {
            setIsAuthenticated(true); // Set authenticated state to true
            // Redirect the user if they are on the login or signup page
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup') {
                navigate('/home', { replace: true });
            }
        } else {
            // If no token, user is not authenticated
            setIsAuthenticated(false);
            // Optionally redirect unauthenticated users trying to access a restricted route
            if (location.pathname !== '/login' && location.pathname !== '/signup') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
