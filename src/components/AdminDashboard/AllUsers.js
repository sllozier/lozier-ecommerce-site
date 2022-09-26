import React from 'react';
import LoadUsers from './LoadUsers';
import RemoveUser from './RemoveUser';
import ModifyUser from './ModifyUser';


const AllUsers = () => {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)
    return (
        <div>
            <div className='edit-product-menu-container'>
                <h1>Welcome Admin</h1>
                <button onClick={() => setAddTorf(!addTorf)}>Add A User</button>
                {addTorf ? <LoadUsers /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A User</button>
                {editTorf ? <ModifyUser /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>User List</button>
                {listTorf ? <RemoveUser /> : <></>}
            </div>
        </div>
    )
};

export default AllUsers;