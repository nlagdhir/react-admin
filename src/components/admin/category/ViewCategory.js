import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../../../utils/Loader";
import http from '../../../http';

const ViewCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategoryList] = useState([]);

    useEffect(() => {
        loadCategory();
    },[]);

    const loadCategory = () => {
        http.get('category-list').then(res => {
            if(res.data.status === 200)  
            {
                setCategoryList(res.data.category);
            } 
            setLoading(false);
        });
    }

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked  = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        http.delete(`/delete-category/${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal('success',res.data.message,'success');
                loadCategory();
            }else if(res.data.status === 404){
                swal('error',res.data.message,'error');
                thisClicked.innerText = 'Delete';
            }
        })
    }

    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-white shadow-sm px-4 py-3 z-index-20">
                <div className="container-fluid px-0">
                <h2 className="mb-0 p-1">View Category</h2>  
                </div>
            </header>

            <div className="bg-white">
            <div className="container-fluid">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 py-3">
                    <li className="breadcrumb-item"><a className="fw-light" href="index.html">Home</a></li>
                    <li className="breadcrumb-item active fw-light" aria-current="page">view category</li>
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
                      <h3 className="h4 mb-0">Category List</h3>
                      <button onClick={() => navigate('/admin/add-category')} className="btn btn-primary btn-sm">Add Category</button>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Slug</th>
                              <th>Status</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categorylist.map((category,index) => {
                                return <tr key={category.id}>
                                    <th scope="row">{++index}</th>
                                    <td>{category.name}</td>
                                    <td>{category.slug}</td>
                                    <td>{(category.status) ? 'In-Active' : 'Active'}</td>
                                    <td>
                                        <Link to={`/admin/edit-category/${category.id}`} className="btn btn-success btn-sm">Edit</Link>
                                    </td>
                                    <td>
                                        <button type="button" onClick={(e) => deleteCategory(e, category.id)} className="btn btn-danger btn-sm">Delete</button>
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

export default ViewCategory;