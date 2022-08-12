import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
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
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
