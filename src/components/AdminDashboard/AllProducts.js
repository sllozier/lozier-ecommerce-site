import React, { useState } from 'react';
import LoadProduct from './LoadProduct';
import ProductList from './ProductList';
import ModifyProduct from './ModifyProduct';
import AllUsers from './AllUsers';
import ModifyUsers from './ModifyUsers';


function AllProducts() {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)
    const [userListTorf, setUserListTorf] = useState(false)
    const [userEditTorf, setUserEditTorf] = useState(false)
    return (
        <div>
            <div className='edit-product-menu-container'>
                <button onClick={() => setAddTorf(!addTorf)}>Add A Product</button>
                {addTorf ? <LoadProduct /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A Product</button>
                {editTorf ? <ModifyProduct /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>Product List</button>
                {listTorf ? <ProductList /> : <></>}
                <button onClick={() => setUserEditTorf(!userEditTorf)}>Edit Users</button>
                {userEditTorf ? <ModifyUsers /> : <></>}
                <button onClick={() => setUserListTorf(!userListTorf)}>User List</button>
                {userListTorf ? <AllUsers /> : <></>}

            </div>
        </div>
    )
}

export default AllProducts;