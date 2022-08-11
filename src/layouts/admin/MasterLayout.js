import React, {useState} from 'react';
import {Routes, Route, Outlet, Navigate} from 'react-router-dom'; 

import '../../assets/admin/css/style.default.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../assets/admin/js/front'
import { AuthProvider } from '../../hooks/useAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';


const MasterLayout = (props) => { 
    const [user,setUser] = useState([]);
    console.log(user.length);

    if(user.length >! 0){
        return <Navigate to="/" />;
    }

    return (
        <div className="page">
            <Navbar />

            <div className="page-content d-flex align-items-stretch">
                <Sidebar />

                <div className="content-inner w-100">
                    <header className="bg-white shadow-sm px-4 py-3 z-index-20">
                        <div className="container-fluid px-0">
                            <h2 className="mb-0 p-1">Dashboard</h2>
                        </div>
                    </header>
                    <Outlet />
                <Footer />
                </div>
            </div>
            
        </div>
    )
}

export default MasterLayout;