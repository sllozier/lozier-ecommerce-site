import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
 import { useDispatch } from 'react-redux';
 import { addNewCampus } from '../store/campusesReducer';

const AddCampus = () => {

    const [ form, setForm ] = useState({
        name: '',
        address: '',
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
        dispatch(addNewCampus({
            name: form.name,
            address: form.address }));
        
    };

    useEffect(() => {
    }, [form])

    return (
        <form id='form' onSubmit={handleSubmit}>
            <h3>Add New Campus:</h3>
            <label htmlFor='name'>Campus Name:</label>
            <input
                name='name'
                value={form.name}
                onChange={handleChange('name')}/>

            <label htmlFor='address'>Campus Address:</label>
            <input
                name='address'
                value={form.address}
                onChange={handleChange('address')}/>

            <button type="submit">Submit</button>
            <Link to="/campuses">Cancel</Link>
        </form>
    )



}

export default AddCampus;