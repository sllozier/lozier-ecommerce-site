import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <>
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
                <Link to='/account'>
                    <h3>Account</h3>
                </Link>

            </nav>
        </>
    )
}

export default NavBar