import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import http from '../../http';
import { useParams, useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";


const ViewProducts = () => {

    const navigate = useNavigate();
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        http.get(`product-list/${slug}`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                swal('warning', res.data.message, 'error').then(() => {
                    navigate('/collections');
                })
            }
            setLoading(false);
        })
    }, []);
    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Products</h1>
                        <p className="lead fw-normal text-white-50 mb-0">List of all the products for {category.name}</p>
                    </div>
                </div>
            </header>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link to="/collections">Category</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {products && products.map(product => {
                            return <div className="col mb-5" key={product.id}>
                                <div className="card h-100">
                                    <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                                        <img className="card-img-top" src={`http://localhost:8000/${product.image}`} alt={product.name} />
                                    </Link>
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <Link to={`/collections/${product.category.slug}/${product.slug}`}>
                                                <h5 className="fw-bolder">{product.name}</h5>
                                            </Link>
                                            <div className="d-flex justify-content-center small text-warning mb-2">
                                                <div className="bi-star-fill"></div>
                                                <div className="bi-star-fill"></div>
                                                <div className="bi-star-fill"></div>
                                                <div className="bi-star-fill"></div>
                                                <div className="bi-star-fill"></div>
                                            </div>
                                            ${product.selling_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </div>
                                    </div>
                                    {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add To Cart</a></div>
                                </div> */}
                                </div>
                            </div>
                        })}
                        {!products.length > 0 ? <div className="col mb-5">No Products found for this category</div> : ''}


                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewProducts;
