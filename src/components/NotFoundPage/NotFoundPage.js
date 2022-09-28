import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <>
        <div className="notFoundContainer">
        <div className="fofContainer">
        4<img src="https://static.vecteezy.com/system/resources/previews/001/207/755/non_2x/broken-record-png.png" alt="" />4
        </div>
        <div>Oh no! The page you were looking for does not exist</div>
        <Link to='/products'>
        <div className="not-found-button">
        <button>Continue shopping</button>
        </div></Link>
        </div>
        </>
    )
}

export default NotFoundPage