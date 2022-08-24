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

    const submitOrder = (e, payment_mode) => {
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
            payment_mode : payment_mode,
            payment_id : '',
        }

        

        switch(payment_mode) {
            case 'cod' : 
                http.put('/place-order',data).then(res => {
                    if(res.data.status === 200)
                    {   
                        swal('Success', res.data.message,'success');
                        setError([]);
                        navigate('/thank-you');
                    } else if(res.data.status === 422) { 
                        swal('Error','All fields are required','error');
                        setError(res.data.errors);
                        
                    }
                })
                break;
            case 'razorpay' : 
                http.post('/validate-order',data).then(res => {
                    if(res.data.status === 200)
                    {   
                        setError([]);

                        let options = {
                            "key": "[Key ID]", // Enter the Key ID generated from the Dashboard
                            "amount": (totalCartPrice * 100),
                            "currency": "INR",
                            "description": "Thank you for purchasing from ECom",
                            "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
                            "prefill":
                            {
                              "name":data.firstname + data.lastname,
                              "email": data.email,
                              "contact": data.phone,
                            },
                            config: {
                              display: {
                                blocks: {
                                  hdfc: { //name for HDFC block
                                    name: "Pay using HDFC Bank",
                                    instruments: [
                                      {
                                        method: "card",
                                        issuers: ["HDFC"]
                                      },
                                      {
                                        method: "netbanking",
                                        banks: ["HDFC"]
                                      },
                                    ]
                                  },
                                  other: { //  name for other block
                                    name: "Other Payment modes",
                                    instruments: [
                                      {
                                        method: "card",
                                        issuers: ["ICIC"]
                                      },
                                      {
                                        method: 'netbanking',
                                      }
                                    ]
                                  }
                                },
                                hide: [
                                  {
                                  method: "upi"
                                  }
                                ],
                                sequence: ["block.hdfc", "block.other"],
                                preferences: {
                                  show_default_blocks: false // Should Checkout show its default blocks?
                                }
                              }
                            },
                            "handler": function (response) {
                              data.payment_id = response.razorpay_payment_id;
                              http.put('/place-order',data).then(res => {
                                if(res.data.status === 200)
                                {   
                                    swal('Success', res.data.message,'success');
                                    setError([]);
                                    navigate('/thank-you');
                                } else if(res.data.status === 422) { 
                                    swal('Error','All fields are required','error');
                                    setError(res.data.errors);
                                    
                                }
                            })
                            },
                            "modal": {
                              "ondismiss": function () {
                                let txt = '';
                                if (window.confirm("Are you sure, you want to close the form?")) {
                                  txt = "You pressed OK!";
                                  console.log("Checkout form closed by the user");
                                } else {
                                  txt = "You pressed Cancel!";
                                  console.log("Complete the Payment")
                                }
                              }
                            }
                          };
                          var rzp = new window.Razorpay(options);
                          rzp.open();
                    } else if(res.data.status === 422) { 
                        swal('Error','All fields are required','error');
                        setError(res.data.errors);
                        
                    }
                });
                break;
            default : 
                break;
        }
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
                                                <button type="button" onClick={(e) =>submitOrder(e,'cod')} className="btn btn-primary m-lg-2">Place Order</button>
                                                <button type="button" onClick={(e) =>submitOrder(e,'razorpay')} className="btn btn-primary">Pay Online</button>
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