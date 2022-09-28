import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignInOut = () => {
  const account = useSelector((state) => state.account);

  return account.username ? (
    <Link to="/products" style={{ textDecoration: 'none' }}>
      <h3>Sign Out</h3>
    </Link>
  ) : (
    <Link to="account-nav" style={{ textDecoration: 'none' }}>
      <h3>Sign In</h3>
    </Link>
  );
};

export default SignInOut;
