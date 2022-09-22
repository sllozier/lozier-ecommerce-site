import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAccount } from '../../store/reducers1/authReducer';

const SignUp = () => {
    const account = useSelector((state) => state.account);
    console.log('ACCOUNT?', account)
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (props) => (event) => {
        setForm({
            ...form,
            [props]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(createAccount(form));  
    };

    

    return !account.id ? (
        <>
            <div id='account-signup' className='signup-container'>
                <h2>Sign up here:</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        name='firstName'
                        value={account.firstName}
                        onChange={handleChange('firstName')} />

                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        name='lastName'
                        value={account.lastName}
                        onChange={handleChange('lastName')} />

                    <label htmlFor='email'>Email:</label>
                    <input
                        name='email'
                        type='email'
                        value={account.email}
                        onChange={handleChange('email')} />

                    <label htmlFor='username'>Choose a username:</label>
                    <input
                        name='username'
                        value={account.username}
                        onChange={handleChange('username')} />

                    <label htmlFor='password'>Password:</label>
                    <input
                        name='password'
                        type='password'
                        value={account.password}
                        onChange={handleChange('password')} />

                    <button type='submit'>Submit</button>
                    {/* <button type='button'><Link to='/'>Cancel</Link></button> */}
                </form>
                
            </div>
        </>
        ): ( <div>You already have an account!</div>)
}

export default SignUp;



// const [hideRequired, setHideRequired] = useState(true);
// if (account.password === account.confirmPassword) {
//     let trigger = true;
//     let addAccount = {};
//     for (let key in account) {
//         if (account[key]) {
//             if (key !== 'confirmPassword') {
//                 addAccount[key] = account[key]
//             }
//         }
//     }
//     if (trigger) {
//         dispatch(signup({ ...account }))
//     } else {
//         setHideRequired(false)
//         setAccount({ ...account, password: '', confirmPassword: '' })
//         alert('Fill in all required fields')
//     }
// } else {
//     alert('Enter matching password')
//     setAccount({ ...account, password: '', confirmPassword: '' })
// }
{/* <label htmlFor='confirmPassword'>Confirm password: {hideRequired ? '' : <span className='required'>password confirmation required</span>}</label>
<input
    name='confirmPassword'
    type='password'
    value={account.confirmPassword}
    onChange={handleChange('confirmpassword')} /> */}
