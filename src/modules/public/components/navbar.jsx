import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (<>
        <div className="w-full py-2 px-4 bg-whtie rounded-lg flex justify-between items-center">
           <a className="hover:bg-base-200 transition-all duration-150 hover:cursor-pointer hover:scale-105 p-2 rounded-md" href="/"> <img src="/logo.png" alt="Gmail" className="w-24" /></a>
            <div className="flex items-center  gap-4">
                <a href="/Login" className="btn btn-outline font-semibold rounded-sm btn-primary">Acceder</a>
                <a href="/Register" className="btn btn-primary font-semibold text-white rounded-sm">Crea una Cuenta</a>
            </div>
        </div>

    </>);
}

export default Navbar;