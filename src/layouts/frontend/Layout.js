import { Outlet } from "react-router-dom";

import Navbar from "../frontend/Navbar";
const Layout = () => {
    return (
        <>
            <div className="container frontend">
                <Navbar />

                <Outlet />
            </div>
        </>
    )
}

export default Layout;