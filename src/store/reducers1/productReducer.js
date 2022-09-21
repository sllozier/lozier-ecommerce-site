import axios from "axios";

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export const deleteProduct = (product) => {
    return {
        type: DELETE_PRODUCT,
        product
    }
}

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

export const getProductsThunk = () => {
    return async (dispatch) => {
        const data = await axios.get('/api/products')
        dispatch(getProducts(data.data))
    }
}

export const addProductThunk = (product) => {
    return async (dispatch) => {
        const data = await axios.post('/api/products', product)
        dispatch(addProduct(data.data))
    }
}

export const deleteProductThunk = (productId) => {
    return async (dispatch) => {
        const data = await axios.delete(`/api/products/${productId}`)
    }
}

export const editProductThunk = (product) => {
    return async (dispatch) => {
        const prodId = Number(product.id)
        console.log(product.id)
        const data = await axios.put(`/api/products/${prodId}`, product)
        dispatch(editProduct(data.data))
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        case ADD_PRODUCT:
            return [...state, action.product]
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.product.id)
        case EDIT_PRODUCT:
            return state.map((product) =>
                product.id === action.product.id ? action.product : product
            )
        default:
            return state
    }
}

export default reducer