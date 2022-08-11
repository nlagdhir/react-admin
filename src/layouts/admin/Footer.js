import React from 'react';

const Footer = () => {
    return (
        <footer className="position-absolute bottom-0 bg-darkBlue text-white text-center py-3 w-100 text-xs" id="footer">
            <div className="container-fluid">
                <div className="row gy-2">
                    <div className="col-sm-6 text-sm-start">
                        <p className="mb-0">Your company &copy; 2017-2021</p>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                        <p className="mb-0">Design by <a href="https://bootstrapious.com/p/admin-template" className="text-white text-decoration-none">Bootstrapious</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;