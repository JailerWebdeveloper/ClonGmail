import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className=" btn btn-error">
            Logout
        </button>
    );
};

export default Logout;
