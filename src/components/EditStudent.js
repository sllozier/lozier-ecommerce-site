import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateThisStudent, fetchOneStudent } from '../store/singleStudentReducer';
import { useParams } from 'react-router-dom';


const EditStudent = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const student = useSelector(state => state.student);
    const campuses = useSelector(state => state.campuses);

    useEffect(() => {
        if(!isNaN(params.studentId))
        dispatch(fetchOneStudent(params.studentId));
    }, []);

    const [ form, setForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        campus: params.campusId,
    })

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateThisStudent({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            campus: form.campus,
        }, params.studentId, student));
    }

    useEffect(() => {
        if(!isNaN(params.studentId))
        dispatch(fetchOneStudent(params.studentId));
    }, []);

    useEffect(() => {
        setForm({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            campus: student.campusId
        })
    }, [student])

    
    
    return(
        <form id='form' onSubmit={handleSubmit}>
        <h1>Edit Student</h1>
    <label htmlFor='firstName'>Student First Name:</label> 
    <input name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>
    <label htmlFor='lastName'>Student Last Name:</label>
    <input name='lastName' value={form.lastName} onChange={handleChange('lastName')}/>
    <label htmlFor='email'>Student Email:</label>
    <input name='email' value={form.email} onChange={handleChange('email')}/>
    <label htmlFor='campus'>Select Campus:</label>
    <select name='campus' defaultValue={student.campusId} onChange={handleChange('campus')}>
        <option value={undefined}>Choose a campus:</option>
        {campuses ? [...campuses].sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0).map(campus => <option value={campus.id} key={campus.id}>{campus.name}</option>) : null}
    </select>
    <button type='submit'>Submit</button>
    </form>
    )
}

export default EditStudent;
