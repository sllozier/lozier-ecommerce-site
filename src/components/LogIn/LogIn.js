import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin } from '../../store/reducers1/authReducer';

const LogIn = () => {
    const dispatch = useDispatch();

    const [ state, setState ] = useState({
        username: '',
        password: '',
    });

    const handleChange= (props) => (event) => {
        setState({
            ...state,
            [props]: event.target.value,
        });
    };

    const handleSubmit= async(event) => {
        event.preventDefault();
        await dispatch(attemptLogin({
            username: state.username,
            password: state.password,
            })
        );
    };

console.log('LOGIN STATE' , state);
    return (
        <div id='account-login' className='login-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    name='username'
                    value={state.username}
                    onChange={handleChange('username')}/>
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    value={state.password}
                    onChange={handleChange('password')}/>
                    <button type='submit'>Log In</button>
            </form>
            <Link to='/account-nav/signup'>Sign up for a new account?</Link>

        </div>

    );
};

export default LogIn;