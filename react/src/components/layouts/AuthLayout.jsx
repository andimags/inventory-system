import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const AuthLayout = () => {
    return (
        <>
            <div className="grid grid-cols-[auto,1fr]">
                <div>
                    <Sidebar />
                </div>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
