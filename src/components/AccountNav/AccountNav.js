import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAccount } from "../../store/reducers1/authReducer";
import LogIn from "../LogIn/LogIn";


const AccountNav = () => {
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutAccount());
        navigate('/');
    };

    return account.id? (
        <div className='account-welcome'>
            {`Welcome Back, `}{' '}
            <Link to='/account-nav/account' className='username'>
                {account.username}
            </Link>
            <button onClick={logout}>Log Out</button>
        </div>
    ):(
        <LogIn />
    );
};

export default AccountNav;