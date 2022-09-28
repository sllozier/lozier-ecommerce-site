import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <>
            <div className='nav-container'>
                <div>
                    {/* <Link to='/products' style={{ textDecoration: 'none' }}> */}
                    <h1>Flintstones Album Collective</h1>
                    <img src="../../../vinyl_logo.png" className="navBarLogo" alt="vinyl icon image" />

                    {/* </Link> */}
                </div>
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

                    <Link to='/products' style={{ textDecoration: 'none' }}>
                        <h3>Shop Albums</h3>
                    </Link>
                    <Link to='/about' style={{ textDecoration: 'none' }}>
                        <h3>About</h3>
                    </Link>
                    <Link to='account-nav' style={{ textDecoration: 'none' }}>
                        <h3>Sign In</h3>
                    </Link>
                    <Link to='account-nav/signup' style={{ textDecoration: 'none' }}>
                        <h3>Sign Up</h3>
                    </Link>

                    <Link to='cart' style={{ textDecoration: 'none' }}>
                        {/* <img className="navBarLogo" src="cart_logo.png" alt="" /> */}
                        <h3 id="logoText">Cart</h3>
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default NavBar