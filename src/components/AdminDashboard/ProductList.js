import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInventory } from '../../store/reducers1/adminReducer';
import { clearProduct, deleteThisProduct } from '../../store/reducers1/productsReducer';

function ProductList() {
    const dispatch = useDispatch()
    const inventory = useSelector((state) => state.admin);

    console.log('PRODUCT LIST', inventory);

    useEffect(() => {
        dispatch(fetchInventory());
        dispatch(clearProduct());
    }, []);
    

    return (
        
         <div className='product-list-wrap'>
            {inventory.map((lineItem) => (
                <div className='product-list-container' key={`${lineItem.id}`}>
                    <h3>Product Id: {lineItem.id}</h3>
                    <img src={`${lineItem.image}`} />
                    <h3>{lineItem.title}</h3>
                    <h3>${lineItem.price}</h3>
                    <p>{lineItem.description}</p>
                    <button onClick={() => dispatch(deleteThisProduct(lineItem.id))}>Delete Product</button>
                    </div>
                    ))}
            </div>
        
    )
};

export default ProductList;