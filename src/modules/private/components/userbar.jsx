
import { FiAlignJustify } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import Logout from "../../auth/components/LogOut";

const UserBar = () => {
    return (
        <nav className="flex w-full py-4 px-8 justify-between items-center border-b">
            <div className="flex items-center  gap-5">
                <div className=" rounded-md hover:bg-base-200 transition-all hover:cursor-pointer p-2">  <FiAlignJustify className="size-8" /></div>
                <div className=" rounded-md hover:bg-base-200 transition-all hover:cursor-pointer"> <img src="/logo.png" alt="logo" className="w-24 " /></div>

            </div>
            <div className="flex items-center gap-2  justify-center w-full">
                <input type="text" placeholder="Busqueda" className="input input-bordered max-w-xl rounded-2xl  w-full " />
                <CiSearch className="text-2xl" />
            </div>
            <div className=" flex items-center gap-5">
                <div className="dropdown dropdown-end ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full  border-2">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Logout/></li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default UserBar;
