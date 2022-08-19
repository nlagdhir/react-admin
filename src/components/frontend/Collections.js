import { useEffect, useState } from "react";
import http from '../../http';
import Loader from '../../utils/Loader';

const Collections = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() =>{
        http.get('all-categories').then(res => {
            if(res.data.status === 200)
            {
                setCategories(res.data.categories)
            }
            setloading(false);
        })
    },[]);

    return (
        <>
            {loading ? <Loader /> : ''}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Collections</h1>
                        <p className="lead fw-normal text-white-50 mb-0">List of all the categories</p>
                    </div>
                </div>
            </header>

            <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {categories.map(category =>{
                        return <div className="col mb-5" key={category.id}>
                            <div className="card h-100">
                                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{category.name}</h5>
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href={`/collections/${category.slug}`}>View Category</a></div>
                                </div>
                            </div>
                        </div>
                    })}
                   
                </div>
            </div>
            </section>
        </>
    )
}

export default Collections;