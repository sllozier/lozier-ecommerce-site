import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountThunk, deleteAccountThunk } from '../../store/reducers1/accountsReducer';
// import LoadUsers from './LoadUsers';
// import RemoveUser from './RemoveUser';
// import ModifyUser from './ModifyUser';


const AllUsers = () => {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const accounts = useSelector(state => state.accounts)

    useEffect(() => {
        dispatch(getAccountThunk())
    }, [])


    return (
        <div className='user-list-container'>
            {accounts ? accounts.map(account =>
                <div className='user-wrapper' key={account.id}>
                    <p>Name: {account.firstName} {account.lastName}</p>
                    <p>Username: {account.username}</p>
                    <p>Address: {account.address}</p>
                    {account.isAdmin ? <p>Admin</p> : <p>Not an Admin</p>}
                    <button onClick={() => deleteAccountThunk(account.id)(dispatch)}>Delete User</button>
                </div>
            ) :
                <div>null</div>
            }
            {/* // <div>Loading accounts...</div>
        // :
        // <div>
        //     <button onClick={() => console.log(state)}>Get Users</button>
        //     <h1>List of Users</h1>
        //     {state.accounts.map(account =>
        //         <div key={account.id}>
        //         <p>{account.username}</p>
        //         <button onClick={() => deleteAccountThunk(account.id)(dispatch)}>Delete</button>
        //         </div>
        //     )} */}
            {/* <div className='edit-product-menu-container'>
                <h1>Welcome Admin</h1>
                <button onClick={() => setAddTorf(!addTorf)}>Add A User</button>
                {addTorf ? <LoadUsers /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A User</button>
                {editTorf ? <ModifyUser /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>User List</button>
                {listTorf ? <RemoveUser /> : <></>}
            </div> */}
        </div>
    )
};

export default AllUsers;