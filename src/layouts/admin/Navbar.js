import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaChartPie, FaRegEnvelope, FaEnvelope, FaSignOutAlt, FaWindowClose
} from "react-icons/fa";
import http from '../../http';
import swal from 'sweetalert';


const Navbar = () => {

    const navBar = document.querySelector('.navbar');
    const searchBtn = document.getElementById('search'),
          searchBox = document.querySelector('.search-box'),
          searchClose = document.querySelector('.dismiss');

    if (navBar) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchBox.classList.add('fadedIn');
        });

        searchClose.addEventListener('click', () => searchBox.classList.remove('fadedIn'));
    }

    const navigate = useNavigate();

    const handleLogoutClick = (e) => {
        e.preventDefault();

        http.post('logout').then(res => {
            if(res.data.status === 200) 
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                swal('success',res.data.message,'success').then(() => {
                    navigate('/login');
                });
            }
        })
    }   

    return (
        <header className="header z-index-50">
            <nav className="navbar py-3 px-0 shadow-sm text-white position-relative">
                <div className="search-box shadow-sm">
                    <button className="dismiss d-flex align-items-center">
                        <FaWindowClose />
                    </button>
                    <form id="searchForm" action="#" role="search">
                        <input className="form-control shadow-0" type="text" placeholder="What are you looking for..." />
                    </form>
                </div>
                <div className="container-fluid w-100">
                    <div className="navbar-holder d-flex align-items-center justify-content-between w-100">
                        <div className="navbar-header">
                            <Link className="navbar-brand d-none d-sm-inline-block" to="/admin">
                                <div className="brand-text d-none d-lg-inline-block"><span>Bootstrap </span><strong>Dashboard</strong></div>
                                <div className="brand-text d-none d-sm-inline-block d-lg-none"><strong>BD</strong></div>
                            </Link>

                            <Link className="menu-btn active" id="toggle-btn" to="#">
                                <span></span><span></span><span></span>
                            </Link>
                        </div>
                        <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                            <li className="nav-item d-flex align-items-center">
                                
                                <Link id="search" to="#">
                                    <FaSearch />
                                </Link>
                                </li>
                            <li className="nav-item dropdown"> 
                                <Link to="#" className="nav-link text-white" id="notifications" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaChartPie /><span className="badge bg-red badge-corner fw-normal">12</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end mt-3 shadow-sm" aria-labelledby="notifications">
                                    <li>
                                        <Link className="dropdown-item py-3"  to="#">
                                        <div className="d-flex">
                                            <div className="icon icon-sm bg-blue">
                                                <FaRegEnvelope />
                                                
                                            </div>
                                            <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-xs text-gray-600">You have 6 new messages </span><small className="small text-gray-600">4 minutes ago</small></div>
                                        </div>
                                        </Link>   
                                    </li>
                                    <li>
                                        <Link className="dropdown-item py-3"  to="#">
                                        <div className="d-flex">
                                            <div className="icon icon-sm bg-green">
                                                <svg className="svg-icon svg-icon-xs svg-icon-heavy">
                                                    <use xlinkHref="#chats-1"> </use>
                                                </svg>
                                            </div>
                                            <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-xs text-gray-600">New 2 WhatsApp messages</span><small className="small text-gray-600">4 minutes ago</small></div>
                                        </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item py-3"  to="#">
                                        <div className="d-flex">
                                            <div className="icon icon-sm bg-orange">
                                                <svg className="svg-icon svg-icon-xs svg-icon-heavy">
                                                    <use xlinkHref="#checked-window-1"> </use>
                                                </svg>
                                            </div>
                                            <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-xs text-gray-600">Server Rebooted</span><small className="small text-gray-600">8 minutes ago</small></div>
                                        </div>
                                        </Link>
                                    </li>
                                    <li><Link className="dropdown-item py-3"  to="#">
                                        <div className="d-flex">
                                            <div className="icon icon-sm bg-green">
                                                <svg className="svg-icon svg-icon-xs svg-icon-heavy">
                                                    <use xlinkHref="#chats-1"> </use>
                                                </svg>
                                            </div>
                                            <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-xs text-gray-600">New 2 WhatsApp messages</span><small className="small text-gray-600">10 minutes ago</small></div>
                                        </div></Link></li>
                                    <li>
                                        <Link className="dropdown-item all-notifications text-center"  to="#">
                                            <strong className="text-xs text-gray-600">view all notifications                                            
                                            </strong>
                                        </Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"> <a className="nav-link text-white" id="messages" rel="nofollow" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaEnvelope />
                                <span className="badge bg-orange badge-corner fw-normal">10</span></a>
                                <ul className="dropdown-menu dropdown-menu-end mt-3 shadow-sm" aria-labelledby="messages">
                                    <li><a className="dropdown-item d-flex py-3" href="#"> <img className="img-fluid rounded-circle" src={require('../../assets/admin/img/avatar-1.jpg')} alt="..." width="45" />
                                        <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-sm text-gray-600">Jason Doe</span><small className="small text-gray-600"> Sent You Message</small></div></a></li>
                                    <li><a className="dropdown-item d-flex py-3" href="#"> <img className="img-fluid rounded-circle" src={require('../../assets/admin/img/avatar-2.jpg')} alt="..." width="45"/>
                                        <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-sm text-gray-600">Jason Doe</span><small className="small text-gray-600"> Sent You Message</small></div></a></li>
                                    <li><a className="dropdown-item d-flex py-3" href="#"> <img className="img-fluid rounded-circle" src={require('../../assets/admin/img/avatar-3.jpg')} alt="..." width="45"/>
                                        <div className="ms-3"><span className="h6 d-block fw-normal mb-1 text-sm text-gray-600">Jason Doe</span><small className="small text-gray-600"> Sent You Message</small></div></a></li>
                                    <li><a className="dropdown-item text-center" href="#"> <strong className="text-xs text-gray-600">Read all messages   </strong></a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown"><a className="nav-link text-white dropdown-toggle d-flex align-items-center" id="languages" href="#" data-bs-toggle="dropdown" aria-expanded="false"><img className="me-2" src={require('../../assets/admin/img/flags/16/GB.png')} alt="English" /><span className="d-none d-sm-inline-block">English</span></a>
                                <ul className="dropdown-menu dropdown-menu-end mt-3 shadow-sm" aria-labelledby="languages">
                                    <li><a className="dropdown-item" rel="nofollow" href="#"> <img className="me-2" src={require('../../assets/admin/img/flags/16/DE.png')} alt="English" /><span className="text-xs text-gray-700">German</span></a></li>
                                    <li><a className="dropdown-item" rel="nofollow" href="#"> <img className="me-2" src={require('../../assets/admin/img/flags/16/FR.png')} alt="English" /><span className="text-xs text-gray-700">French                                         </span></a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a onClick={handleLogoutClick} className="nav-link text-white" href="/login"> <span className="d-none d-sm-inline">Logout</span>
                                <FaSignOutAlt />
                                </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;