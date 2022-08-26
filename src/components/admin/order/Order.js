import Loader from "../../../utils/Loader";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from '../../../http';


const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Orders";

    http.get("/orders").then((res) => {
      if (res.data.status === 200) {
        setOrders(res.data.orders);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loader />}
      <header className="bg-white shadow-sm px-4 py-3 z-index-20">
        <div className="container-fluid px-0">
          <h2 className="mb-0 p-1">View Orders</h2>
        </div>
      </header>

      <div className="bg-white">
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 py-3">
              <li className="breadcrumb-item">
                <a className="fw-light" href="index.html">
                  Home
                </a>
              </li>
              <li
                className="breadcrumb-item active fw-light"
                aria-current="page"
              >
                Orders
              </li>
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
                  <h3 className="h4 mb-0">Orders List</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table mb-0 table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order Tracking No</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => {
                          return (
                            <tr key={order.id}>
                              <th scope="row">{++index}</th>
                              <td>{order.tracking_no}</td>
                              <td>{order.phone}</td>
                              <td>{order.email}</td>
                              
                              <td>
                                <Link
                                  to={`/view-order/${order.id}`}
                                  className="btn btn-success btn-sm"
                                >
                                  View Order
                                </Link>
                              </td>
                            </tr>
                          );
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
  );
};

export default Order;
