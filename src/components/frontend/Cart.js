import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import http from '../../http';
import swal from "sweetalert";

const Cart = () => {

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

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

    let cartHTML = '';
    if(cart.length > 0){
        cartHTML = <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(item => {
                    return (
                        <tr key={item.id}>
                            <td width="10%">
                                <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                            </td>
                            <td>{item.product.name}</td>
                            <td width="15%" className="text-center">{item.product.selling_price}</td>
                            <td width="15%">
                                <div className="input-group">
                                    <button type="button" className="input-group-text">-</button>
                                    <div className="form-control text-center">{item.product_qty}</div>
                                    <button type="button" className="input-group-text">+</button>
                                </div>
                            </td>
                            <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
                            <td width="15%">
                                <button type="button" className="btn btn-danger btn-sm">Remove</button>
                            </td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    </div>
    } else {
        cartHTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty</h4>
            </div>
        </div>
    }

    return (

        
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Cart</h1>
                    </div>
                </div>
            </header>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>

            <section className="py-5">
            <div className="container ">
                <div className="row ">
                <div className="col-md-12 ">
                    {cartHTML}
                </div>
                </div>
            </div>
            </section>
        </>
    )
}

export default Cart;