import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk, deleteProductThunk } from '../../store/reducers1/productsReducer'

function RemoveProduct() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        const getData = async () => {
            await getProductsThunk()(dispatch)
        }
        getData()
    }, [])

    if (products.length > 0) {
        console.log(products[0].image)
    }
    return (
        
         <div className='product-list-wrap'>
            {products
            ? products.map((product) => (
                <div className='product-list-container' key={`${product.id}`}>
                    <h3>Product Id: {product.id}</h3>
                    <img src={`${product.image}`} />
                    <h3>{product.title}</h3>
                    <h3>${product.price}</h3>
                    <p>{product.description}</p>
                    <button onClick={() => dispatch(deleteProductThunk(product.id))}>Delete Product</button>
                    </div>
                    ))
                
                :null}
            </div>
        
    )
};

export default RemoveProduct;