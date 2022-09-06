import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <div id='navbar' className='row'>
            <NavLink to='/students' className='active'>Students</NavLink>
            <NavLink to='/campuses' className='active'>Campuses</NavLink>
        </div>
    );
};

export default Navbar;