import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../../store/reducers1/authReducer';

const SignUp = () => {
    const dispatch = useDispatch();
    const [ account, setAccount ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [ hideRequired, setHideRequired ] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(account.password === account.confirmPassword){
            let trigger = true;
            let addAccount = {};
            for (let key in account){
                if(account[key]){
                    if(key !== 'confirmPassword'){
                        addAccount[key] = account[key]
                    }
                }
            }
            if (trigger){
                dispatch(signup({...account}))
            }else{
                setHideRequired(false)
                setAccount({...account, password: '', confirmPassword: ''})
                alert('Fill in all required fields')
            }
        }else {
            alert('Enter matching password')
            setAccount({...account, password:'', confirmPassword: ''})
        }
    }

    //I prefer using [ form, setForm ] but, since I am needing to authorize passwords etc.
    //I opted to do it this way.

    return (
        <div id='account-signup'>
            <h2>Sign up here:</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name: {hideRequired ? '' : <span className='required'>first name required</span>}</label>
            <input 
            name='firstName' 
            value={account.firstName} 
            onChange={(event) => setAccount({...account, firstName: event.target.value})}/>

            <label htmlFor='lastName'>Last Name: {hideRequired ? '' : <span className='required'>last name required</span>}</label>
            <input 
            name='lastName' 
            value={account.lastName} 
            onChange={(event) => setAccount({...account, lastName: event.target.value})}/>

            <label htmlFor='email'>Email: {hideRequired ? '' : <span className='required'>email required</span>}</label>
            <input 
            name='email'
            type='email'
            value={account.email} 
            onChange={(event) => setAccount({...account, email: event.target.value})}/>

            <label htmlFor='username'>Choose a username: {hideRequired ? '' : <span className='required'>username required</span>}</label>
            <input 
            name='username' 
            value={account.username} 
            onChange={(event) => setAccount({...account, username: event.target.value})}/>

            <label htmlFor='password'>Password: {hideRequired ? '' : <span className='required'>password required</span>}</label>
            <input 
            name='password'
            type='password' 
            value={account.password} 
            onChange={(event) => setAccount({...account, password: event.target.value})}/>

            <label htmlFor='confirmPassword'>Confirm password: {hideRequired ? '' : <span className='required'>password confirmation required</span>}</label>
            <input 
            name='confirmPassword'
            type='password' 
            value={account.confirmPassword} 
            onChange={(event) => setAccount({...account, confirmPassword: event.target.value})}/>

            <button type='submit'>Submit</button>
            <button type='button'><Link to='/'>Cancel</Link></button>
        </form>

        </div>
    )
}

export default SignUp;