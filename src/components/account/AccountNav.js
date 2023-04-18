import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/authSlice";
import { fetchAccountData } from "../../store/reducers/accountSlice";
import OrderHistory from "./OrderHistory";
import WishList from "./WishList";

//THIS WILL NEED TO BE MOVED TO PORTAL AND NAVBAR WILL BE HERE INSTEAD//
const AccountNav = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("AUTH", auth);
  useEffect(() => {
    if (auth.id) dispatch(fetchAccountData(auth.id));
  }, [auth.id]);

  const logoutAccount = () => {
    dispatch(logout());
    navigate("/");
  };
  console.log("USER", user);
  return auth.id ? (
    <div className="account-welcome">
      <h1>Welcome Back:</h1>
      <h1>{auth.username}</h1>
      <Link to="/orderHistory">
        <button>Order History</button>
      </Link>
      <Link to="/wishlist">
        <button>Wishlist</button>
      </Link>
      <button onClick={logoutAccount}>Log Out</button>
    </div>
  ) : (
    <Link to="/login">
      <h1>You need to log in!</h1>
    </Link>
  );
};

export default AccountNav;
