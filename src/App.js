import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Homepage from './components/frontend/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/admin/category/Category';
import ViewCategory from './components/admin/category/ViewCategory';
import EditCategory from './components/admin/category/EditCategory';
import AddProduct from './components/admin/product/AddProduct';
import ViewProduct from './components/admin/product/ViewProduct';
import EditProduct from './components/admin/product/EditProduct';
import Order from './components/admin/order/Order';
import Cart from './components/frontend/Cart';
import Checkout from './components/frontend/Checkout';
import MasterLayout from './layouts/admin/MasterLayout';
import PrivateRoutes from './utils/PrivateRoutes';
import NonLoggedInRoutes from './utils/NonLoggedInRoutes';
import axios from 'axios';
import Layout from './layouts/frontend/Layout';
import About from './components/frontend/About';
import Contact from './components/frontend/Contact';
import Collections from './components/frontend/Collections';
import ViewProducts from './components/frontend/ViewProducts';
import ProductDetails from './components/frontend/ProductDetails';
import ThankYou from './components/frontend/ThankYou';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<ViewProducts />} />
          <Route path="/collections/:category/:product" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thank-you' element={<ThankYou />} />
        </Route>
        <Route element={<NonLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<MasterLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="add-category" element={<Category />} />
            <Route path="view-category" element={<ViewCategory />} />
            <Route path="view-category" element={<ViewCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="view-product" element={<ViewProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Order />} />
            

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
