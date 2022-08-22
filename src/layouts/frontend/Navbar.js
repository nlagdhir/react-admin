import { NavLink } from "react-router-dom";
import { logout } from "../../utils/Scripts";
const Navbar = () => {
    let token = localStorage.getItem('auth_token');

    const handleLogout = () => {
        logout();
    }
    return (
        
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <NavLink activeclassname="active" className='nav-link' to="">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeclassname="active" className='nav-link'  to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeclassname="active" className='nav-link'  to="/contact">Contact</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink activeclassname="active" className='nav-link'  to="/collections">Collections</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink activeclassname="active" className='nav-link'  to="/cart">Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                {token ? <button type="button" onClick={handleLogout} className='btn btn-outline-danger' to="/login">Logout</button> : <NavLink className='btn btn-outline-success' to="/login">Login</NavLink>}      
                            </li>
                            
                        </ul>
                    </div>
                </nav>
        </>
    )
}

export default Navbar;