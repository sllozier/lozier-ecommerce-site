import axios from 'axios';
import { getProductsThunk } from './productsReducer';
// const { isAdmin } = require('../../../server/api/gateKeeper')

const GET_PRODUCT = 'GET_PRODUCT';
const GET_INVENTORY = 'GET_INVENTORY';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// const GET_ACCOUNT = 'GET_ACCOUNT';

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

// const getAccount = (account) => {
//   return {
//     type: GET_ACCOUNT,
//     account,
//   }
// }

const getInventory = (products) => {
  return {
    type: GET_INVENTORY,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};


export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    product: null,
  };
};

export const addProductThunk = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/admin/products', product)
      // dispatch(addProduct(data))
      // const token = window.localStorage.getItem('token');
      // history.push('/admin')
      // console.log(history)
      // if (token) {
      //   var { data } = await axios.post('/api/admin/products', product, {
      //     headers: {
      //       authorization: token
      //     }
      //   })
      // }
      console.log(data)
      dispatch(addProduct(data))

    } catch (error) {
      console.log('uh oh something went wrong adding products.', error);
    }
  }
}

// export const getAccountThunk = () =>  {
//   try {
//     return async (dispatch) => {
//       const { data } = await axios.get('/api/admin/accounts')
//       dispatch(getAccount(data))
//     }
//   } catch (error) {
//     console.log('uh oh something went wrong getting accounts.', error);
//   }
// }


// export const addProductThunk = (product, history) => {
//   return async (dispatch) => {
//     try {
//       console.log(product)
//       const token = window.localStorage.getItem('token');
//       if (token) {
//         await axios.post('/api/admin/products', product, {
//           headers: {
//             authorization: token
//           }
//         });
//       }
//       dispatch(getProductsThunk());
//       history.push('/admin');
//     } catch (error) {
//       console.log('uh oh something went wrong adding products.', error);
//     }
//   };
// };

export const fetchInventory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/admin/products');
      dispatch(getInventory(data));
    } catch (error) {
      console.log('uh oh something went wrong fetching products.', error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/admin/products/${id}`);
      dispatch(getProduct(product));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/admin/products/${product.id}`, product);
      dispatch(fetchSingleProduct(product.id));
      history.push('/admin');
    } catch (error) {
      console.log('Error occured in updating single style.', error);
    }
  };
};

export const deleteThisProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`api/products/${id}`);
      console.log(data)
      dispatch(deleteProduct(data));
    } catch (error) {
      console.log('uh oh something went wrong deleting products.', error);
    }
  };
};

export const editProductThunk = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`api/admin/products/${product.id}`, product)
      dispatch(editProduct(data))
    } catch (error) {
      console.log('uh oh something went wrong editing the product.', error);
    }
  }
}

export default function adminReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      console.log(action)
      return [...state, action.product]
    case EDIT_PRODUCT:
      console.log(action)
      return [...state, action.product]
    case GET_INVENTORY:
      return action.products;
    case GET_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case CLEAR_PRODUCT:
      return action.product;
    default:
      return state;
  }
}