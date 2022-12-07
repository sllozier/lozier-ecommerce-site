import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { editAccountThunk } from '../../store/reducers1/accountsReducer'

const EditUser = () => {
    const dispatch = useDispatch()

    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFName] = useState('')
    const [lastName, setLName] = useState('')
    const [isAdmin, setAdmin] = useState(false)
    const [address, setAddress] = useState('')

    const handleId = (event) => {
        setId(Number(event.target.value))
    }
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleFName = (event) => {
        setFName(event.target.value)
    }
    const handleLName = (event) => {
        setLName(event.target.value)
    }
    const handleAdmin = (event) => {
        if (event.target.value === 'true') {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
        // setAdmin(event.target.value)
    }
    const handleAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(id, username, email, firstName, lastName, isAdmin, address)
        editAccountThunk({ id, username, email, firstName, lastName, isAdmin, address })(dispatch)
    }

    return (
        <>
            <div className='edit-container'>
                <h2>Edit Account</h2>
                <form onSubmit={handleSubmit}>
                    <p>Account Id</p>
                    <input onChange={handleId} type='text' />
                    <p>Username</p>
                    <input onChange={handleUsername} type='text' />
                    <p>email</p>
                    <input onChange={handleEmail} type='text' />
                    <p>First Name</p>
                    <input onChange={handleFName} type='text' />
                    <p>Last Name</p>
                    <input onChange={handleLName} type='text' />
                    <p>Admin: true or false</p>
                    <input onChange={handleAdmin} type='text' />
                    <p>Address</p>
                    <input onChange={handleAddress} />
                    <button type='submit'>Edit Account</button>
                </form>
            </div>
        </>
    )
}

export default EditUser;