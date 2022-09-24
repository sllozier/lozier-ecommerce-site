import React, { useState } from 'react';
import LoadProduct from './LoadProduct';
import RemoveProduct from './RemoveProduct';
import ModifyProduct from './ModifyProduct';


function AllProducts() {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)
    return (
        <div>
            <div className='edit-product-menu-container'>
                <h1>Welcome Admin</h1>
                <button onClick={() => setAddTorf(!addTorf)}>Add A Product</button>
                {addTorf ? <LoadProduct /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A Product</button>
                {editTorf ? <ModifyProduct /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>Product List</button>
                {listTorf ? <RemoveProduct /> : <></>}
            </div>
        </div>
    )
}

export default AllProducts;