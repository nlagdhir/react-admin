import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/admin/category/Category';
import ViewCategory from './components/admin/category/ViewCategory';
import EditCategory from './components/admin/category/EditCategory';
import AddProduct from './components/admin/product/AddProduct';
import ViewProduct from './components/admin/product/ViewProduct';
import MasterLayout from './layouts/admin/MasterLayout';
import PrivateRoutes from './utils/PrivateRoutes';
import NonLoggedInRoutes from './utils/NonLoggedInRoutes';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
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
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
