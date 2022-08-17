import { useEffect, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import http from '../../../http';
import Loader from '../../../utils/Loader';


const ViewProduct = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get('view-products').then(res => {
            if(res.data.status === 200)
            {
                setProducts(res.data.products);
            }
            setLoading(false);
        })
    },[]);

    return (
        <>
        {loading ? <Loader /> : ''}
        <header className="bg-white shadow-sm px-4 py-3 z-index-20">
            <div className="container-fluid px-0">
            <h2 className="mb-0 p-1">View Product</h2>  
            </div>
        </header>

        <div className="bg-white">
        <div className="container-fluid">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 py-3">
                <li className="breadcrumb-item"><a className="fw-light" href="index.html">Home</a></li>
                <li className="breadcrumb-item active fw-light" aria-current="page">view product</li>
            </ol>
            </nav>
        </div>
        </div>

        <section className="tables">   
        <div className="container-fluid">
          <div className="row gy-4">
          <div className="col-lg-12">
              <div className="card mb-0">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3 className="h4 mb-0">Product List</h3>
                  <button onClick={() => navigate('/admin/add-product')} className="btn btn-primary btn-sm">Add Product</button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table mb-0 table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Category</th>
                          <th>Product Name</th>
                          <th>Selling Price</th>
                          <th>Status</th>
                          <th>Image</th>
                          <th>Edit</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {products.map((product,index) => {
                        let statusHTML = '';
                        if(product.status === 1){
                          statusHTML = <span className="text-danger">In Active</span>;
                        }else{
                          statusHTML = <span className="text-success">Active</span>;
                        }

                        
                        return <tr key={product.id}>
                            <th scope="row">{++index}</th>
                            <td>{product.category.name}</td>
                            <td>{product.name}</td>
                            <td>{product.selling_price}</td>
                            <td>{statusHTML}</td>
                            <td><img src={`http://localhost:8000/${product.image}`} width='50px' alt={product.name} /></td>
                            <td>
                                <Link to={`/admin/edit-product/${product.id}`} className="btn btn-success btn-sm">Edit</Link>
                            </td>
                            
                        </tr>
                    })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
    </>
    )
}

export default ViewProduct;