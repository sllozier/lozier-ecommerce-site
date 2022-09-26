import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
// const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
    return{
      type: DELETE_PRODUCT,
      product,
    };
  };
  
  
//   export const clearProduct = () => {
//     return{
//       type: CLEAR_PRODUCT,
//       product: null,
//     };
//   };

export const getProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(getProducts(data));
    } catch (error) {
      console.log('uh oh something went wrong fetching products.', error);
    }
  };
};

// export const deleteProductThunk = (productId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.delete(`/api/products/${productId}`);
//       // console.log('data', data)
//       dispatch(deleteProduct(data));
//     } catch (error) {
//       console.log('uh oh something went wrong deleting products.', error);
//     }
//   };
// };

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      // console.log('delete product switch case', state)
      // return state.filter((product) => product.id !== action.product.id);
    // case CLEAR_PRODUCT:
    //   return action.product;
    default:
      return state;
  }
}