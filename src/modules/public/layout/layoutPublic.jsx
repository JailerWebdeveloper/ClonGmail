import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Toaster, toast } from 'sonner'

const LayoutPublic = () => {
    return ( <>
    <Navbar/>
    <Outlet/>
    <Toaster />
    </> );
}
 
export default LayoutPublic;