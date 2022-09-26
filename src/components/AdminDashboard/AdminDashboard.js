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
            <div className='all-users'>
                <h3>Placeholder for link to all users</h3>
            </div>
            <div className='delete-user'>
                <h3>Placeholder for link to delete single user</h3>
            </div>
            <div className='handle-product'>
                <AllProducts />
            </div>
            <div className='handle-user'>
                <AllUsers />
            </div>
            {/* <div className='add-product'>
                <LoadProduct />
            </div> */}
        </div>
    );
};

export default AdminDashboard;