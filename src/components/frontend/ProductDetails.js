import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import swal from "sweetalert";
import http from './../../http';

const ProductDetails = () => {

    const { category, product } = useParams();
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        http.get(`view-product/${category}/${product}`).then(res => {
            if (res.data.status === 200) {
                setProductData(res.data.product);
            }
            else if (res.data.status === 404) {
                swal('warning', res.data.message, 'error');
            }
            setLoading(false);
        })

    })
    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Product Detail</h1>
                    </div>
                </div>
            </header>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/collections">Category</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>

            
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`http://localhost:8000/${productData.image}`} className="img-fluid rounded-start" alt={productData.name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title">{productData.name}
                                <span className="float-end badge btn btn-sm btn-danger">{productData.brand}</span>
                            </h4>
                            <p className="card-text">{productData.description}</p>
                            <h4 className="mb-1">
                                Rs : {productData.selling_price}
                                <s className="mb-2">Rs : {productData.original_price}</s>
                                {productData.quantity > 0 ? <label className="float-end btn-sm btn-success">In Stock</label> : <label className="float-end btn-sm btn-danger">Out of Stock</label>}
                                
                            </h4>
                            <div className="row mt-3"> 
                                <div className="col-md-3 mt-3">
                                    <div className="input-group">
                                        <button type="button" className="input-text-group">-</button>
                                        <input type="text" className="form-control text-center" value="1" />
                                        <button type="button" className="input-text-group">+</button>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="card-footer p-4 pl-0 border-top-0 bg-transparent">
                                    <a className="btn btn-outline-dark mt-auto" href="#">Add To Cart</a>
                                    <a className="btn btn-outline-danger mt-auto ms-2" href="#">Add To Whishlist</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ProductDetails;