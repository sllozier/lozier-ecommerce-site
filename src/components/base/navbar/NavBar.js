import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../auth';
import Search from './Search';

const NavBar = () => {
  return (
    <>
    <h1 className='is-family-monospace'>Main NavBar includes:</h1>
        <p className='is-family-monospace'>Home Button, Dropdown filters, Search Bar, LogIn, Cart, Sale Ribbon</p>
    
    <nav className='navbar is-transparent is-primary has-logo-above is-family-monospace' role="navigation" aria-label="main navigation">
      <div className='navbar-brand is-family-monospace'>
        <a className='navbar-item' href="/">
          <img src="/piccies/waybackNavbarLogo.svg" width="280" height="70"/>
        </a>
        <div className='navbar-item field has-addons'>
          <div className='control is-centered has-icons-right'>
            <input className='input is-family-monospace' type="search" placeholder='search...'/>
            <span className='icon is-small is-right'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
          <div className='control '>
            <button type="submit" class="button is-danger is-family-monospace">Search</button>
          </div>
        </div>
  
        <a role="button" className='navbar-burger burger' aria-label="menu" aria-expanded="false" data-target="navBarMain">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navBarMain" className='navbar-menu'>
        <div className='navbar-start'>
          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link has-text-info'>
              Shop By Genre
            </a>
              <div className='navbar-dropdown'>
                <a className='navbar-item' href='albums'>
                  Genre 1
                </a>
                <a className='navbar-item' href='albums'>
                  Genre 2
                </a>
                <a className='navbar-item' href='albums'>
                  Genre 3
                </a>
                <a className='navbar-item' href='albums'>
                  Genre 4
                </a>
              </div>
            </div>
            <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link has-text-info' href='/albums'>
              Shop By Artist
            </a>
            <div className='navbar-dropdown'>
                <a className='navbar-item' href='albums'>
                  Artist 1
                </a>
                <a className='navbar-item' href='albums'>
                  Artist 2
                </a>
                <a className='navbar-item' href='albums'>
                  Artist 3
                </a>
                <a className='navbar-item' href='albums'>
                  Artist 4
                </a>
              </div>
            </div>
            <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link has-text-info' href='/albums'>
              Shop By Title
            </a>
            <div className='navbar-dropdown'>
                <a className='navbar-item' href='albums'>
                  Title 1
                </a>
                <a className='navbar-item' href='albums'>
                  Title 2
                </a>
                <a className='navbar-item' href='albums'>
                  Title 3
                </a>
                <a className='navbar-item' href='albums'>
                  Title 4
                </a>
              </div>
          </div>
        </div>
        <div className='navbar-end'>
          {/* <a className='navbar-item' href="#">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a> */}
          <a className='navbar-item' href="/cart">
              <i className="has-text-black fa-solid fa-cart-shopping fas fa-2x"></i>
          </a>
          <a className='navbar-item' href="/login">
              <i className="has-text-black fa-solid fa-right-to-bracket fas fa-2x"></i>
          </a>
              
           
          
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
}

export default NavBar;
