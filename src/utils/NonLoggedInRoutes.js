import { Outlet, Navigate } from "react-router-dom";

const NonLoggedInRoutes = () => {
    let token = localStorage.getItem('auth_token');

    return (
        token ? <Navigate to="/admin" /> : <Outlet />
    )
}

export default NonLoggedInRoutes;