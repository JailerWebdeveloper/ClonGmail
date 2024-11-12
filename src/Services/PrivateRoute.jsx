import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const isTokenValid = () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) return false;
    return true;
};

const PrivateRoute = ({ children }) => {
    return isTokenValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
