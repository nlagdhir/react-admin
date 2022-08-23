import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import http from '../../http';
import swal from "sweetalert";

const Checkout = () => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        firstname : '',
        lastname : '',
        phone : '',
        email : '',
        address : '',
        city : '',
        state : '',
        zipcode : ''
    });
    const [error, setError] = useState([]);

    const navigate = useNavigate();
    let totalCartPrice = 0;

    useEffect(() => {
        http.get(`/cart`).then(res=> {
            
            if(res.data.status === 200)
            {
                setCart(res.data.cart);
            }
            else if(res.data.status === 401)
            {
                swal('Error',res.data.message,'error');
                navigate('/'); 
            }
            setLoading(false);
        })
    },[]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            firstname : checkoutInput.firstname,
            lastname : checkoutInput.lastname,
            phone : checkoutInput.phone,
            email : checkoutInput.email,
            address : checkoutInput.address,
            city : checkoutInput.city,
            state : checkoutInput.state,
            zipcode : checkoutInput.zipcode,
        }

        http.put('/place-order',data).then(res => {
            if(res.data.status === 200)
            {   
                swal('Success', res.data.message,'success');
                navigate('/thank-you');
            } else if(res.data.status === 422) { 
                swal('Error','All fields are required','error');
                setError(res.data.errors);
                
            }
        })
    }

    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Checkout</h1>
                    </div>
                </div>
            </header>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
            </nav>

            <section className="py-5">
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Basic Information</h4>    
                                </div>    
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>First Name</label>
                                                <input type='text' onChange={handleInput} value={checkoutInput.firstname} name="firstname" className="form-control" />
                                                <small className="text-danger">{error.firstname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Last Name</label>
                                                <input type='text' name="lastname" onChange={handleInput}  value={checkoutInput.lastname} className="form-control" />
                                                <small className="text-danger">{error.lastname}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Phone Number</label>
                                                <input type='text' name="phone" onChange={handleInput}  value={checkoutInput.phone} className="form-control" />
                                                <small className="text-danger">{error.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Email Address</label>
                                                <input type='text' name="email" onChange={handleInput}  value={checkoutInput.email} className="form-control" />
                                                <small className="text-danger">{error.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label>Full Address</label>
                                                <textarea rows='3' onChange={handleInput} value={checkoutInput.address} name="address" className="form-control" />
                                                <small className="text-danger">{error.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>City</label>
                                                <input type='text' name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                                <small className="text-danger">{error.city}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>State</label>
                                                <input type='text' name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                                <small className="text-danger">{error.state}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label>Zip Code</label>
                                                <input type='text' name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                                <small className="text-danger">{error.zipcode}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <button type="button" onClick={submitOrder} className="btn btn-primary">Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div className="col-md-5">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cart.map(item => {
                                    totalCartPrice += item.product.selling_price * item.product_qty;
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.product.name}</td>
                                            <td>{item.product.selling_price}</td>
                                            <td>{item.product_qty}</td>
                                            <td>{item.product.selling_price * item.product_qty}</td>
                                        </tr>
                                    )
                                    })}
                                    <tr>
                                        <td colSpan='2' className="text-end fw-bold">Grand Total</td>
                                        <td colSpan='2' className="text-end fw-bold">{totalCartPrice}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout;