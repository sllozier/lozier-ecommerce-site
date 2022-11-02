import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutAccount } from "../../store/reducers1/authReducer";


//THIS IS USED IN THE MAIN NAVBAR, NEED TO CHANGE TO LOGOUT ONLY//
const LogoutButton = () => {
  const account = useSelector((state) => state.account);

  const logout = () => {
    dispatch(logoutAccount());
    navigate('/');
};

  return account.username ? (
    <Link onClick={logout} to="/" style={{ textDecoration: 'none' }}>
      <h3>Sign Out</h3>
    </Link>
  ) : (
    <Link to="account-nav" style={{ textDecoration: 'none' }}>
      <h3>Sign In</h3>
    </Link>
  );
};

export default LogoutButton;
