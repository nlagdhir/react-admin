import React from 'react'; 
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
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
            <li className={location.pathname == '/admin/dashboard' ? "sidebar-item active" : "sidebar-item"}>
              <Link to='/admin/dashboard' className="sidebar-link"><FaHome />  Dashboard</Link>
              </li>
            <li className={location.pathname == '/admin/profile' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/profile' className="sidebar-link"><FaHome />Profile</Link></li>
            
            <li className="sidebar-item"><a className="sidebar-link" href="#category" data-bs-toggle="collapse"> 
            <FaHome />Category </a>
              <ul className="collapse list-unstyled " id="category"> 
              <li className={location.pathname == '/admin/add-category' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/add-category' className="sidebar-link">Add Category</Link></li>
              <li className={location.pathname == '/admin/view-category' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/view-category' className="sidebar-link">View Category</Link></li>
              </ul>
            </li>

            <li className="sidebar-item"><a className="sidebar-link" href="#products" data-bs-toggle="collapse"> 
            <FaHome />Products </a>
              <ul className="collapse list-unstyled " id="products">
                <li className={location.pathname == '/admin/add-product' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/add-product' className="sidebar-link">Add Product</Link></li>
                <li className={location.pathname == '/admin/view-product' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/view-product' className="sidebar-link">View Product</Link></li>
              </ul>
            </li>
            <li className={location.pathname == '/admin/orders' ? "sidebar-item active" : "sidebar-item"}><Link to='/admin/orders' className="sidebar-link"><FaHome />Orders</Link></li>
          </ul>
        </nav>
    )
}

export default Sidebar;
