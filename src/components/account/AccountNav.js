import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//import { logoutAccount } from "../../store/reducers1/authReducer";
import { LogIn } from "../auth";

//THIS WILL NEED TO BE MOVED TO PORTAL AND NAVBAR WILL BE HERE INSTEAD//
const AccountNav = () => {
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutAccount());
        navigate('/');
    };

    return account.id ? (
        <div className='account-welcome'>
            <h1>Welcome Back:</h1>
            <Link to='/account-nav/account' className='welcome-username'>
                <h1>{account.username}</h1>
            </Link>
            <button onClick={logout}>Log Out</button>
        </div>
    ) : (
        <LogIn />
    );
};

export default AccountNav;