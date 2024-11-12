import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                setIsAuthenticated(decoded.exp > currentTime);
            } catch (error) {
                console.error("Error decoding token:", error);
                setIsAuthenticated(false);
            }
        }
    }, []);

    return isAuthenticated;
};

export const useUser =()=> {
const userinfo = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
if(userinfo) {
    const decodedInfo =jwtDecode(userinfo);
    return decodedInfo
}
}