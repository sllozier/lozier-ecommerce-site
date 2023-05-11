import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../store/reducers/authSlice";
import SaleRibbon from "./SaleRibbon";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const account = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  document.addEventListener("DOMContentLoaded", () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  });

  const logoutAccount = () => {
    dispatch(logout());
    // navigate("/");
  };
  return (
    <>
      <nav
        className="navbar is-transparent is-primary has-logo-above is-family-monospace"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand ml-4 is-family-monospace">
          <a className="navbar-item is-hidden-touch" href="/">
            <img
              src="/piccies/waybackNavbarLogo_new.png"
              // width="280"
              // height="70"
            />
          </a>
          <div className="navbar-end mr-4">
            <div className="navbar-item field has-addons ">
              <div className="control has-icons-right ">
                <input
                  className="input is-family-monospace"
                  type="search"
                  placeholder="search..."
                />
                <span className="icon is-small is-right">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
              <div className="control ">
                <button
                  type="submit"
                  className="button is-danger is-family-monospace"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navBarMain"
          href="/login"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div id="navBarMain" className="navbar-menu">
          <div className="navbar-start ml-4">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link has-text-warning">Shop By Genre</a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="albums">
                  Genre 1
                </a>
                <a className="navbar-item" href="albums">
                  Genre 2
                </a>
                <a className="navbar-item" href="albums">
                  Genre 3
                </a>
                <a className="navbar-item" href="albums">
                  Genre 4
                </a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link has-text-warning" href="/albums">
                Shop By Artist
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="albums">
                  Artist 1
                </a>
                <a className="navbar-item" href="albums">
                  Artist 2
                </a>
                <a className="navbar-item" href="albums">
                  Artist 3
                </a>
                <a className="navbar-item" href="albums">
                  Artist 4
                </a>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link has-text-warning" href="/albums">
                Shop By Title
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="albums">
                  Title 1
                </a>
                <a className="navbar-item" href="albums">
                  Title 2
                </a>
                <a className="navbar-item" href="albums">
                  Title 3
                </a>
                <a className="navbar-item" href="albums">
                  Title 4
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-end mr-4">
            {/* <a className='navbar-item' href="#">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a> */}
            {account.id ? (
              <span className="icon is-medium ml-2">
                <a
                  className="navbar-item has-tooltip-arrow has-tooltip-left has-tooltip-info"
                  data-tooltip="logout"
                  onClick={logoutAccount}
                >
                  <i className="has-text-warning fa-solid fa-right-from-bracket fas fa-lg"></i>
                </a>
              </span>
            ) : (
              <span className="icon is-medium ml-2">
                <a
                  className="navbar-item has-tooltip-arrow has-tooltip-left has-tooltip-info"
                  data-tooltip="login"
                  href="/login"
                >
                  <i className="has-text-warning fa-solid fa-right-to-bracket fas fa-lg"></i>
                </a>
              </span>
            )}
            <span className="icon is-medium mr-2">
              <a className="navbar-item" href="/cart">
                <i className="has-text-warning fa-solid fa-cart-shopping fas fa-lg"></i>
              </a>
            </span>
          </div>
        </div>
      </nav>

      {/* <div className="nav-container">
        <div>
          <Link to='/products' style={{ textDecoration: 'none' }}>
          <h1>Flintstones Album Collective</h1>
          <img
            src="https://pngimg.com/uploads/vinyl/vinyl_PNG59.png"
             "../../../vinyl_logo.png"
            className="navBarLogo"
            alt="vinyl icon image"
          />

          </Link>
        </div>
        <nav>
          <Link to='/'>
                    <h3>Home</h3>
                </Link>
                <Link to='/products'>
                    <h3>Products(AllAlbums)</h3>
                </Link>
                <Link to='/single-product'>
                    <h3>Single Album</h3>
                </Link>
                <Link to='admin-panel'>
                    <h3>Admin Panel</h3>
                </Link>
                <Link to='account-nav'>
                    <h3>Account Navigation</h3>
                </Link>
                <Link to='cart'>
                    <h3>Cart</h3>
                </Link>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <h3>Shop Albums</h3>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <h3>About</h3>
          </Link>
          <Link to="account-nav/signup" style={{ textDecoration: 'none' }}>
            <h3>Sign Up</h3>
          </Link>
          
          <LogoutButton />

          <Link to="cart" style={{ textDecoration: 'none' }}>
            <img className="navBarLogo" src="cart_logo.png" alt="" />
            <h3 id="logoText">Cart</h3>
          </Link>
        </nav>
      </div> */}
    </>
  );
};

export default NavBar;
