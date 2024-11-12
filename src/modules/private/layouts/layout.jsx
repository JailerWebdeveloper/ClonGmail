import { Outlet } from "react-router-dom";
import UserBar from "../components/userbar";
import { Toaster, toast } from 'sonner'

const Layout = () => {
    return (<>
        <div className="w-full min-h-screen">
            <div className="w-full h-full flex flex-col">
                <UserBar />
                <div className="w-full flex">
                    <div className="flex-1">
                        <Outlet />
                        <Toaster richColors />

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Layout;