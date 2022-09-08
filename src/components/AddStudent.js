import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
 import { useDispatch } from 'react-redux';
 import { addNewStudent } from '../store/studentsReducer';

const AddStudent = () => {

    const [ form, setForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const dispatch = useDispatch();

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addNewStudent({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
        }));
        
    };

    useEffect(() => {
    }, [form])

    return (
        <form id='form' onSubmit={handleSubmit}>
            <h3>Add New Student:</h3>
            <label htmlFor='firstName'>Student First Name:</label>
            <input
                name='firstName'
                value={form.firstName}
                onChange={handleChange('firstName')}/>

            <label htmlFor='lastName'>Student Last Name:</label>
            <input
                name='lastName'
                value={form.lastName}
                onChange={handleChange('lastName')}/>

            <label htmlFor='email'>Student Email:</label>
            <input
                name='email'
                value={form.email}
                onChange={handleChange('email')}/>

            <button type="submit">Submit</button>
            <Link to="/students">Cancel</Link>
        </form>
    )



}

export default AddStudent;