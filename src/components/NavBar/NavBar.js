import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <>
            <nav>
                {/* <Link to='/'>
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
                </Link> */}

                <Link to='/products'>
                    <h3>Home</h3>
                </Link>
                <Link to='/about'>
                    <h3>About</h3>
                </Link>
                <Link to='account-nav'>
                    <h3>Sign In</h3>
                </Link>
                <Link to='account-nav/signup'>
                    <h3>Sign Up</h3>
                </Link>
                <Link to='cart'>
                    <h3>Cart</h3>
                </Link>
            </nav>
        </>
    )
}

export default NavBar