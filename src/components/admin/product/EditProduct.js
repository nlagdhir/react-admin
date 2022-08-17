import { useEffect, useState } from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useParams, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../../../utils/Loader';
import http from '../../../http';

const EditProduct = () => {

    const [loading, setLoading] = useState(true);
    const [productInput, setProductInput] = useState({
        category: '',
        slug : '',
        name : '',
        description : '',

        meta_title : '',
        meta_description : '',
        meta_keyword : '',
        
        selling_price : '',
        original_price : '',  
        quantity : '',
        brand : '',
        featured : false,
        popular : false,
        status : false,
        error_list : [],
    });
    const [image, setImage] = useState([]);
    const [categorylist, setCategoryList] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        http.get('all-category').then(res => {
            if(res.data.status === 200)
            {
                setCategoryList(res.data.category);
            }
        });

        http.get(`product-edit/${id}`).then(res => {
            if(res.data.status === 200)
            {
                const {category,image,slug,name, description, meta_title,meta_description,meta_keyword, selling_price, original_price, quantity,brand,featured,popular,status } = res.data.product;

                setProductInput({
                    category,
                    image,
                    slug,
                    name,
                    description,
                    meta_title,
                    meta_description,
                    meta_keyword,
                    selling_price,
                    original_price,
                    quantity,
                    brand,
                    featured,
                    popular,
                    status,
                    error_list : [],
                });

            }
            else if(res.data.status === 404)
            {
                swal('error',res.data.message,'error');
                navigate('/admin/view-product');
            }
            setLoading(false);
        })
    },[]);

    const handleInput = (event) => {
        if(event.target.type == 'checkbox'){
            setProductInput({...productInput,[event.target.name]:event.target.checked})
        } else if(event.target.name == 'image' ){
            setImage({image:event.target.files[0]});
        } else {
            setProductInput({...productInput,[event.target.name]:event.target.value})
        }
        console.log(productInput);
    }

    const handleProductEditFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('image',image.image);
        formData.append('slug',productInput.slug);
        formData.append('category',productInput.category.id);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);

        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_description',productInput.meta_description);
        formData.append('meta_keyword',productInput.meta_keyword);

        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('quantity',productInput.quantity);
        formData.append('brand',productInput.brand);
        formData.append('featured',productInput.featured ? '1' : '0');
        formData.append('popular',productInput.popular ? '1' : '0');
        formData.append('status',productInput.status ? '1' : '0');
        
        http.post(`update-product/${id}`,formData).then(res => {
            if(res.data.status === 200)
            {
                swal('success',res.data.message,'success').then(()=>{
                    navigate('/admin/view-product');
                })
            }
            else if(res.data.status === 422)
            {
                swal('All fields are mandatory','','error');
                setProductInput({...productInput,error_list:res.data.errors});
            }
            else if(res.data.status === 404)
            {
                swal('error',res.data.message,'error');
                navigate('admin/view-product');
            }
            setLoading(false);
        })
    }

    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-white shadow-sm px-4 py-3 z-index-20">
                <div className="container-fluid px-0">
                <h2 className="mb-0 p-1">Product</h2>  
                </div>
            </header>

            <div className="bg-white">
                <div className="container-fluid">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 py-3">
                    <li className="breadcrumb-item"><a className="fw-light" href="index.html">Home</a></li>
                    <li className="breadcrumb-item active fw-light" aria-current="page">edit product</li>
                    </ol>
                </nav>
                </div>
            </div>

            <section className="forms">
            <div className="container-fluid">
                <div className="row">
                    <form onSubmit={handleProductEditFormSubmit} encType="multipart/form-data" id="product-form"> 
                        <Tabs
                            defaultActiveKey="product"
                            id="product-tab"
                            className="mb-3"
                        >
                            <Tab eventKey="product" title="Product">
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="slug">Category :</label>
                                        <select name="category" onChange={handleInput} value={productInput.category.id}  className={productInput.error_list.category ? "form-control is-invalid" : "form-control"}>
                                            <option>Select Category</option>
                                            { categorylist && categorylist.length ? categorylist.map(category => {
                                                return <option value={category.id} key={category.id}>{category.name}</option>;
                                            }) : <option>data still Loading</option>}
                                        </select>
                                        <div className='invalid-feedback'>{productInput.error_list.category}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="slug">Slug :</label>
                                        <input type="text" onChange={handleInput} value={productInput.slug} className={productInput.error_list.slug ? "form-control is-invalid" : "form-control"} id="slug" name="slug" placeholder="Slug"  />
                                        <div className='invalid-feedback'>{productInput.error_list.slug}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="name">Name :</label>
                                        <input type="text" onChange={handleInput} value={productInput.name}  className={productInput.error_list.name ? "form-control is-invalid" : "form-control"} id="name" name="name" placeholder="Name"  />
                                        <div className='invalid-feedback'>{productInput.error_list.name}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="description">Description :</label>
                                        <textarea className="form-control" name="description" onChange={handleInput} id="description" value={productInput.description}/>
                                        <div className='invalid-feedback'>{productInput.error_list.description}</div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="seo-content" title="SEO Tags">
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="meta_title">Meta Title :</label>
                                        <input type="text" className="form-control" id="meta_title" name="meta_title" placeholder="Meta Title" onChange={handleInput} value={productInput.meta_title}   />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="meta_key">Meta Keyword :</label>
                                        <input type="text" className="form-control" id="meta_key"  name="meta_keyword"  placeholder="Meta World" onChange={handleInput} value={productInput.meta_keyword}   />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="meta-description">Meta Description :</label>
                                        <textarea className="form-control" id="meta-description" name="meta_description" onChange={handleInput} value={productInput.meta_description} />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="other-details" title="Othe Details">
                                <div className="row">
                                <div className="col-md-4 mb-3">
                                        <label htmlFor="selling_price">Selling Price :</label>
                                        <input type="text" onChange={handleInput} value={productInput.selling_price} className={productInput.error_list.selling_price ? "form-control is-invalid" : "form-control"} id="selling_price" name="selling_price" placeholder="Selling Price"  />
                                        <div className='invalid-feedback'>{productInput.error_list.selling_price}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="original_price">Original Price :</label>
                                        <input type="text" onChange={handleInput} value={productInput.original_price} className={productInput.error_list.original_price ? "form-control is-invalid" : "form-control"} id="original_price" name="original_price" placeholder="Original Price"  />
                                        <div className='invalid-feedback'>{productInput.error_list.original_price}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="quantity">Quantity :</label>
                                        <input type="text" onChange={handleInput} value={productInput.quantity}  className={productInput.error_list.quantity ? "form-control is-invalid" : "form-control"} id="quantity" name="quantity" placeholder="Quantity"  />
                                        <div className='invalid-feedback'>{productInput.error_list.quantity}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="brand">Brand :</label>
                                        <input type="text" onChange={handleInput} value={productInput.brand}  className={productInput.error_list.brand ? "form-control is-invalid" : "form-control"} id="brand" name="brand" placeholder="Brand"  />
                                        <div className='invalid-feedback'>{productInput.error_list.brand}</div>
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label htmlFor="image">Image :</label>
                                        <input type="file" onChange={handleInput} className={productInput.error_list.image ? "form-control is-invalid" : "form-control"} id="image" name="image" placeholder="Image"  />
                                        <img src={`http://localhost:8000/${productInput.image}`} width="50px" alt={productInput.name} />
                                        <div className='invalid-feedback'>{productInput.error_list.image}</div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <input className="form-check-input" name="featured" onChange={handleInput} checked={productInput.featured ? 'checked' : ''} value={productInput.featured} type="checkbox" id="featured"  />   
                                        <label htmlFor="featured">&nbsp;Featured (Checked = shown) :</label>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <input className="form-check-input" name="popular" onChange={handleInput} value={productInput.popular} checked={productInput.popular ? 'checked' : ''} type="checkbox" id="popular"  />   
                                        <label htmlFor="popular">&nbsp;Popular (Checked = shown) :</label>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <input className="form-check-input" name="status" onChange={handleInput} value={productInput.status} checked={productInput.status ? 'checked' : ''} type="checkbox" id="status"  />   
                                        <label htmlFor="status">&nbsp;Status (Checked = Hidden) :</label>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>

                </div>
            </div>
        </section>
        </>
    )
}

export default EditProduct;