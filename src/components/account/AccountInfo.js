import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountInfo = () => {
  const account = useSelector((state) => state.auth);

  return account.username ? (
    <div className="account-container">
      <div className="account-info">
        <h1>Account Information:</h1>
        <h3>{`Name: ${account.firstName} ${account.lastName}`}</h3>
        <h3>{`Username: ${account.username}`}</h3>
        <h3>{`Email: ${account.email}`}</h3>
        <h3>
          {" "}
          Address:{" "}
          {account.address ? account.address : <button>Add Address</button>}
        </h3>
      </div>
      {account.isAdmin ? (
        <Link to="/adminDashboard">
          <button>Admin Dashboard</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div>You must be logged in to view account information</div>
  );
};

export default AccountInfo;
