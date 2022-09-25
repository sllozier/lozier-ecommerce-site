import axios from "axios";
import  history from '../../utils/history';

const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
// const ADD_PRODUCT = 'ADD_PRODUCT'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'
// const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
};

export const deleteProduct = (product) => {
    return{
        type: DELETE_PRODUCT,
        product
    }
};

export const clearProduct = () => {
    return{
        type: CLEAR_PRODUCT,
        product: null,
    }
};
// export const addProduct = (product) => {
//     return {
//         type: ADD_PRODUCT,
//         product
//     }
// };

// export const deleteProduct = (product) => {
//     return {
//         type: DELETE_PRODUCT,
//         product
//     }
// };

// export const editProduct = (product) => {
//     return {
//         type: EDIT_PRODUCT,
//         product
//     }
// };

export const getProductsThunk = () => {
    return async (dispatch) => {
        const data = await axios.get('/api/products')
        dispatch(getProducts(data.data))
    }
};

export const deleteThisProduct = (id) => {
    return async(dispatch) => {
        try{
            console.log('PRODUCTS DELETE', id)
            const { data: deletedProduct} = await axios.delete(`/api/products/${id}`);
            dispatch(deleteProduct(deletedProduct));
        }catch(error){
            console.log('DELETE PRODUCT THUNK ERROR ', error);
        }
    }
}
// export const fetchProducts = () => {
//     return async(dispatch) => {
//         try{
//             const { data } = await axios.get('/api/products');
//             dispatch(getProducts(data));
//         }catch(error){
//             console.log('FETCH PRODUCTS THUNK ERROR ', error);
//         }
//     }
// }

// export const addProductThunk = (product) => {
//     return async (dispatch) => {
//         try{
//             console.log('ADD THUNK', product)
//             const token = window.localStorage.getItem('token');
//             console.log('THUNK TOKEN', token)
//             if(token){
//                 await axios.post('/api/admin', product, {
//                     headers: {
//                         authorization: token
//                     }
//                 })
//                 dispatch(fetchProducts());
//                 history.push('/admin')
//             }
//         }catch(error){
//             console.log('ADD PRODUCT THUNK ERROR ', error)
//         }
//     }
// };

// export const deleteProductThunk = (productId) => {
//     return async (dispatch) => {
//         try{
//             const deletedProduct = await axios.delete(`/api/products/${productId}`);
//             dispatch(deleteProduct(deletedProduct.data))
//         }catch(error){
//             console.log('DELETE PRODUCT THUNK ERROR ', error)
//         }
        
//     }
// };

// export const editProductThunk = (product) => {
//     return async (dispatch) => {
//         const prodId = Number(product.id)
//         console.log(product.id)
//         const data = await axios.put(`/api/products/${prodId}`, product)
//         dispatch(editProduct(data.data))
//     }
// };

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.product.id);
        case CLEAR_PRODUCT:
            return action.product;
        // case ADD_PRODUCT:
        //     return action.product
        // case EDIT_PRODUCT:
        //     return state.map((product) =>
        //         product.id === action.product.id ? action.product : product
        //     )
        default:
            return state
    }
}

export default productsReducer;