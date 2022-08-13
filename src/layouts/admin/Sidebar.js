import React from 'react'; 
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return  (
        <nav className="side-navbar z-index-40">
          <div className="sidebar-header d-flex align-items-center py-4 px-3"><img className="avatar shadow-0 img-fluid rounded-circle" src={require('../../assets/admin/img/avatar-1.jpg')} alt="..." />
            <div className="ms-3 title">
              <h1 className="h4 mb-2">Mark Stephen</h1>
              <p className="text-sm text-gray-500 fw-light mb-0 lh-1">Web Designer</p>
            </div>
          </div>
          <span className="text-uppercase text-gray-400 text-xs letter-spacing-0 mx-3 px-2 heading">Main</span>
          <ul className="list-unstyled py-4">
            <li className="sidebar-item active">
              <Link to='/admin/dashboard' className="sidebar-link"><FaHome />  Dashboard</Link>
              </li>
            <li className="sidebar-item"><Link to='/admin/profile' className="sidebar-link"><FaHome />Profile</Link></li>
            <li className="sidebar-item"><Link to='/admin/category' className="sidebar-link"><FaHome />Category</Link></li>
           
          </ul>
        </nav>
    )
}

export default Sidebar;
