import React, { useState } from 'react';
import AddNewProduct from './AddNewProduct';
import ProductTable from './ProductTable';
import EditProduct from './EditProduct';
import UserTable from './UserTable';
import EditUser from './EditUser';


const ProductUserActions = () => {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)
    const [userListTorf, setUserListTorf] = useState(false)
    const [userEditTorf, setUserEditTorf] = useState(false)
    return (
        <div>
            <div className='edit-product-menu-container'>
                <button onClick={() => setAddTorf(!addTorf)}>Add A Product</button>
                {addTorf ? <AddNewProduct /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A Product</button>
                {editTorf ? <EditProduct /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>Product List</button>
                {listTorf ? <ProductTable /> : <></>}
                <button onClick={() => setUserEditTorf(!userEditTorf)}>Edit An Account</button>
                {userEditTorf ? <EditUser /> : <></>}
                <button onClick={() => setUserListTorf(!userListTorf)}>Account List</button>
                {userListTorf ? <UserTable /> : <></>}

            </div>
        </div>
    )
}

export default ProductUserActions;