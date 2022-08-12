import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let token = localStorage.getItem('auth_token');

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;