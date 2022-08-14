import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import http from '../../../http';

const EditCategory = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const [categoryInput, setCategoryInput] = useState({
        slug : '',
        name : '',
        description : '',
        status : false,
        meta_title : '',
        meta_description : '',
        meta_keyword : '',
        error_list : [],
    });

    useEffect(() => {
        http.get(`category-edit/${id}`).then(res => {
            if(res.data.status === 200)
            {
                const {slug,name,description,status,meta_title,meta_description,meta_keyword} = res.data.category
                
                setCategoryInput({
                    slug,
                    name,
                    description,
                    meta_title,
                    meta_description,
                    meta_keyword,
                    status,
                    error_list : [],
                });
                
            }
            else if(res.data.status === 404){
                swal('error',res.data.message,'error');
                navigate('/admin/view-category');
            }
        })
    },[])

    const handleInput = (event) => {
        event.persist();
        if(event.target.name != 'status'){
            setCategoryInput({...categoryInput,[event.target.name]:event.target.value})
        } else{
            setCategoryInput({...categoryInput,[event.target.name]:event.target.checked})
        }
    }

    const handleCategoryFormUpdate = (event) => {
        event.preventDefault();

        const data = categoryInput;

        http.put(`update-category/${id}`,data).then(res => {
            if(res.data.status === 200) 
            {
                setCategoryInput({
                    slug : '',
                    name : '',
                    description : '',
                    status : '',
                    meta_title : '',
                    meta_description : '',
                    meta_keyword : '',
                    error_list : [],
                });

                swal('success',res.data.message,'success');   
            }
            else if(res.data.status === 422)
            {
                setCategoryInput({...categoryInput,error_list : res.data.errors});
             
            } else if(res.data.status === 404){
                swal('error',res.data.message,'error');
                navigate('/admin/view-category');
            }
        })
    }

    return (
        <>
            <header className="bg-white shadow-sm px-4 py-3 z-index-20">
                <div className="container-fluid px-0">
                <h2 className="mb-0 p-1">Edit Category</h2>  
                </div>
            </header>

            <div className="bg-white">
                <div className="container-fluid">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 py-3">
                    <li className="breadcrumb-item"><a className="fw-light" href="index.html">Home</a></li>
                    <li className="breadcrumb-item active fw-light" aria-current="page">edit category</li>
                    </ol>
                </nav>
                </div>
            </div>

            <section className="forms">
                <div className="container-fluid">
                    <div className="row">
                        <form onSubmit={handleCategoryFormUpdate} id="category-form"> 
                            <Tabs
                                defaultActiveKey="category"
                                id="category-tab"
                                className="mb-3"
                            >
                                <Tab eventKey="category" title="Category">
                                    <div className="form-row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="slug">Slug :</label>
                                            <input type="text" onChange={handleInput} value={categoryInput.slug} className={categoryInput.error_list.slug ? "form-control is-invalid" : "form-control"} id="slug" name="slug" placeholder="Slug"  />
                                            <div className='invalid-feedback'>{categoryInput.error_list.slug}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="name">Name :</label>
                                            <input type="text" onChange={handleInput} value={categoryInput.name}  className={categoryInput.error_list.name ? "form-control is-invalid" : "form-control"} id="name" name="name" placeholder="Name"  />
                                            <div className='invalid-feedback'>{categoryInput.error_list.name}</div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="description">Description :</label>
                                            <textarea className="form-control" name="description" onChange={handleInput} id="description" value={categoryInput.description}/>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="status">Status : </label>
                                            <input className="form-check-input" name="status" onChange={handleInput} checked={categoryInput.status ? 'checked' : ''} value={categoryInput.status} type="checkbox" id="status"  />
                                            <label className="form-check-label" htmlFor="status">
                                                &nbsp; (0 - Shown
                                                1 - Hidden)
                                            </label>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="seo-content" title="SEO Tags">
                                    <div className="form-row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="meta_title">Meta Title :</label>
                                            <input type="text" className="form-control" id="meta_title" name="meta_title" placeholder="Meta Title" onChange={handleInput} value={categoryInput.meta_title}   />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="meta_key">Meta Keyword :</label>
                                            <input type="text" className="form-control" id="meta_key"  name="meta_keyword"  placeholder="Meta World" onChange={handleInput} value={categoryInput.meta_keyword}   />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="meta-description">Meta Description :</label>
                                            <textarea className="form-control" id="meta-description" name="meta_description" onChange={handleInput} value={categoryInput.meta_description} />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}

export default EditCategory;