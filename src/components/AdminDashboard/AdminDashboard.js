import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AllProducts from './AllProducts';
import LoadProduct from './LoadProduct';
import AllUsers from './AllUsers';

const AdminDashboard = () => {
    const account = useSelector((state) => state.account);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account.isAdmin) {
            navigate('/');
        }
    }, []);

    return (
        <div className='admin-dashboard'>
            <h1>Welcome Admin: {account.firstName}</h1>
            <div className='handle-product'>
                <AllProducts />
            </div>
            {/* <div className='handle-user'>
                <AllUsers />
            </div> */}
            {/* <div className='add-product'>
                <LoadProduct />
            </div> */}
        </div>
    );
};

export default AdminDashboard;