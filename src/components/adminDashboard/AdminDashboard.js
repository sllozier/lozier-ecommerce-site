import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const account = useSelector((state) => state.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account.isAdmin) {
            navigate('/');
        }
    }, []);

    return (
        <>
        <h1>Admin Dashboard</h1>
        <h3>Admin Navbar</h3>
        <h3>Users Table + Edit/Delete Users + Orders by User</h3>
        <h3>Products Table + Add/Edit/Delete Products</h3>
        <h3>All Orders Table + Sorting Orders Option</h3>
        <h3>Edit Admin Profile</h3>
        </>
        // <div className='admin-dashboard'>
        //     <h1>Welcome Admin: {account.firstName}</h1>            
        // </div>
    );
};

export default AdminDashboard;