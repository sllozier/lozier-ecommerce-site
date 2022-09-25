import axios from 'axios';
import { deleteThisProduct } from './productsReducer';

const GET_PRODUCT = 'GET_PRODUCTS';
const GET_INVENTORY = 'GET_INVENTORY';

const getProduct = (product) => {
    return{
        type: GET_PRODUCT,
        product,
    };
};

const getInventory = (products) => {
    return{
        type: GET_INVENTORY,
        products,
    };
};

export const addProduct = (product, history) => {
    return async(dispatch) => {
        try{
            const token = window.localStorage.getItem('token');
            if(token){
                await axios.post('/api/admin/products', product, {
                    headers: {
                        authorization: token
                    }
                });
            }
            dispatch(getProducts());
            history.push('/admin');
        }catch(error){
            console.log('ADD PRODUCT THUNK ERROR ', error);
        }
    };
};

export const fetchInventory = () => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get('/api/admin/products');
            console.log('FETCH INVENTORY', data)
            dispatch(getInventory(data));
        }catch(error){
            console.log('FETCH INVENTORY THUNK ERROR ', error);
        }
    };
};

export const fetchSingleProduct = (id) => {
    return async(dispatch) => {
        try{
            const { data: product } = await axios.get(`/api/admin/products/${id}`);
            dispatch(getProduct(product));
        }catch(error){
            console.log('FETCH SINGLE PRODUCT ERROR ', error);
        }
    };
};

export const updateProduct = (lineItem, history) => {
    return async (dispatch) => {
        try{
            await axios.put (`/api/admin/products/${lineItem.id}`, lineItem);
            dispatch(fetchSingleProduct(lineItem.id));
            history.push('/admin');
        }catch(error){
            console.log('UPDATE PRODUCT THUNK ERROR ', error);
        }
    };
};

// export const deleteProduct = (lineItemId) => {
//     return async (dispatch) => {
//         try{
//             console.log('ADMIN DELETE', lineItemId)
//             await axios.delete(`/api/products/${lineItemId}`);
//             dispatch(deleteThisProduct(lineItemId));
//         }catch(error) {
//             console.log('DELETE PRODUCTS THUNK ERROR ', error);
//         }
//     };
// };

export const adminReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        case GET_INVENTORY:
            return action.products;
        default:
            return state;
    }
}