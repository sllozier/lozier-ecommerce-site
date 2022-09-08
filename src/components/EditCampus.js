import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateThisCampus, fetchOneCampus } from '../store/singleCampusReducer';
import { useParams } from 'react-router-dom';

const EditCampus = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const campus = useSelector(state => state.campus);

    useEffect(() => {
        if(!isNaN(params.campusId))
        dispatch(fetchOneCampus(params.campusId));
    }, []);

     const [ form, setForm ] = useState({
        name: '',
        address: '',
     })

     const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    }

     const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateThisCampus({
            name: form.name,
            address: form.address,
        }, params.campusId, campus));
     }

     useEffect(() => {
        if(!isNaN(params.campusId))
        dispatch(fetchOneCampus(params.campusId));
    }, []);

     useEffect(() => {
        setForm({
            name: campus.name,
            address: campus.address,
        })
     }, [campus])

    
    
    return(
        <form id='form' onSubmit={handleSubmit}>
                <h3>Edit Campus</h3>
            <label htmlFor='name'>Campus Name:</label> 
            <input name='name' value={form.name} onChange={handleChange('name')}/>
            <label htmlFor='address'>Campus Address:</label>
            <input name='address' value={form.address} onChange={handleChange('address')}/>
            <button type='submit'>Submit</button>
            </form>
    )
}

export default EditCampus;









{/* <form id='edit-campus-form' onSubmit={handleSubmit}>
                        <h3>Edit Campus:</h3>
                    <label htmlFor='name'>Campus Name:</label>
                        <input name='name' value={form.name } onChange={handleChange('name')}/>
    
                    <label htmlFor='address'>Campus Address:</label>
                        <input name='address' value={form.address } onChange={handleChange('address')}/>
                            <button type='submit'>Submit</button>
                    </form> */}

                    // const [ form, setForm ] = useState({
    //     name: '',
    //     address: '',
    // })

    // const handleChange = prop => event => {
    //     setForm({
    //         ...form,
    //         [prop]: event.target.value
    //     })
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(updateThisCampus({
    //         name: form.name,
    //         address: form.address
    //     }, params.campusId));
    // }

    // useEffect(() => {
    //     dispatch(fetchOneCampus(params.campusId));
    // }, []);

    // useEffect (() => {
    //     setForm({
    //         name: campus.name,
    //         address: campus.address
    //     })
    // }, [campus])
