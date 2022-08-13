import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import swal from "sweetalert";
import http from '../http';
const PrivateRoutes = () => {
    console.log('Private Routes Rendered');
    // const [authenticated, setAuthenticated] = useState(false);
    
    // useEffect(() => {
    //     http.get('checkingAuthenticated').then(res => {
    //         if(res.status === 200){
    //             setAuthenticated(true);
    //         }
    //     });
    // },[]);
    

    let token = localStorage.getItem('auth_token');

    if(!token) {
        swal('warning','You are not authorised','warning');
    }

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;