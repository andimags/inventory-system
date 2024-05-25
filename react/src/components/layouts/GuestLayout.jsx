import { Alert } from "flowbite-react";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
        <>
            <Alert color="info">
                <span className="font-medium">Info alert!</span> Change a few
                things up and try submitting again.
            </Alert>

            <Outlet />
        </>
    );
};

export default GuestLayout;
