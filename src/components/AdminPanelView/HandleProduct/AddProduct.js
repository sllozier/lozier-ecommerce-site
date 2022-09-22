import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProductThunk } from '../../../store/reducers1/productReducer'

function AddProduct() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const handleTitle = (event) => {
        console.log(title)
        setTitle(event.target.value)
    }
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }
    const handleStock = (event) => {
        setStock(event.target.value)
    }
    const handleImage = (event) => {
        setImage(event.target.value)
    }
    const handleDescription = (event) => {
        setDescription(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(title, price, stock, image, description)
        addProductThunk({ title, price, stock, image, description })(dispatch)
    }
    return (
        <>
            <div className='add-product-container'>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <p>Title</p>
                    <input onChange={handleTitle} type='text' />
                    <p>Price</p>
                    <input onChange={handlePrice} type='number' />
                    <p>Stock</p>
                    <input onChange={handleStock} type='number' />
                    <p>Image</p>
                    <input onChange={handleImage} type='text' />
                    <p>Description</p>
                    <textarea onChange={handleDescription}></textarea>
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </>
    )
}

export default AddProduct