import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { updateProduct, fetchSingleProduct, editProductThunk } from '../../store/reducers1/adminReducer'
import { useParams } from 'react-router-dom';
// import { editProductThunk } from '../../../store/reducers1/productsReducer'

// import { produceWithPatches } from 'immer';

const EditProduct = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const handleId = (event) => {
        console.log(event.target.value)
        setId(Number(event.target.value))
    }
    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handlePrice = (event) => {
        setPrice(Number(event.target.value))
    }
    const handleStock = (event) => {
        setStock(Number(event.target.value))
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
        editProductThunk({ id, title, price, stock, image, description })(dispatch)
    }
    // const dispatch = useDispatch()
    const params = useParams()

    const product = useSelector((state) => state.product);

    // useEffect(() => {
    //     if (!isNaN(params.id));
    //     dispatch(fetchSingleProduct(params.id));
    // }, []);

    const [form, setForm] = useState({
        title: '',
        price: 0,
        stock: 0,
        image: '',
        description: '',
    });

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch(updateProduct({
    //         title: form.title,
    //         price: form.price,
    //         stock: form.stock,
    //         image: form.image,
    //         description: form.description,
    //     }, params.id, product));
    // };

    // useEffect(() => {
    //     if (!isNaN(params.id))
    //         dispatch(fetchSingleProduct(params.id));
    // }, []);

    // useEffect(() => {
    //     setForm({
    //         title: product.title,
    //         price: product.price,
    //         stock: product.stock,
    //         image: product.image,
    //         description: product.description,
    //     }, [product])
    // })

    // const [id, setId] = useState(0)
    // const [title, setTitle] = useState('')
    // const [price, setPrice] = useState('')
    // const [stock, setStock] = useState(0)
    // const [image, setImage] = useState('')
    // const [description, setDescription] = useState('')

    // const handleId = (event) => {
    //     console.log(event.target.value)
    //     setId(Number(event.target.value))
    // }
    // const handleTitle = (event) => {
    //     setTitle(event.target.value)
    // }
    // const handlePrice = (event) => {
    //     setPrice(Number(event.target.value))
    // }
    // const handleStock = (event) => {
    //     setStock(Number(event.target.value))
    // }
    // const handleImage = (event) => {
    //     setImage(event.target.value)
    // }
    // const handleDescription = (event) => {
    //     setDescription(event.target.value)
    // }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     // console.log(title, price, stock, image, description)
    //     updateProduct({ id, title, price, stock, image, description })(dispatch)
    // }

    return (
        <>

            <div className='edit-container'>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <p>Product Id</p>
                    <input onChange={handleId} type='number' />
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
                    <button type='submit'>Edit Product</button>
                </form>
            </div>
        </>
    )
}

export default EditProduct;