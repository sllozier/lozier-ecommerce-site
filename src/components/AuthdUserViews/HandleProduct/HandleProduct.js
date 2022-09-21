import React, { useState } from 'react'
import AddProduct from './AddProduct'
import DeleteProduct from './DeleteProduct'
import EditProduct from './EditProduct'


function HandleProduct() {
    const [addTorf, setAddTorf] = useState(false)
    const [editTorf, setEditTorf] = useState(false)
    const [listTorf, setListTorf] = useState(false)
    return (
        <div>
            <div className='edit-product-menu-container'>
                <h1>Welcome Auth'd User</h1>
                <button onClick={() => setAddTorf(!addTorf)}>Add A Product</button>
                {addTorf ? <AddProduct /> : <></>}
                <button onClick={() => setEditTorf(!editTorf)}>Edit A Product</button>
                {editTorf ? <EditProduct /> : <></>}
                <button onClick={() => setListTorf(!listTorf)}>Product List</button>
                {listTorf ? <DeleteProduct /> : <></>}
            </div>
        </div>
    )
}

export default HandleProduct