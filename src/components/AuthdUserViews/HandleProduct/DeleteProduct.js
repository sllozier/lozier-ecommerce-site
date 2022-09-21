import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk, deleteProductThunk } from '../../../store/reducers1/productReducer'

function DeleteProduct() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        const getData = async () => {
            await getProductsThunk()(dispatch)
        }
        getData()
    }, [])

    console.log(state)
    if (state.products.length > 0) {
        console.log(state.products[0].image)
    }
    return (
        <>
            {state.products.length > 0 ?
                <div className='product-list-wrap'>
                    {state.products.map(product =>
                        <>
                            <div className='product-list-container'>
                                <h3>Product Id: {product.id}</h3>
                                <img src={`${product.image}`} />
                                < h3 > {product.title}</h3>
                                <h3>${product.price}</h3>
                                <p>{product.description}</p>
                                <button onClick={() => deleteProductThunk(product.id)(dispatch)}>Delete Product</button>
                            </div>
                        </>
                    )}
                </div>
                :
                <>no data</>
            }
        </>
    )
}

export default DeleteProduct