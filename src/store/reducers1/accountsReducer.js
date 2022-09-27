import axios from "axios";

// const GET_ACCOUNTS = 'GET_ACCOUNTS';
const GET_ACCOUNT = 'GET_ACCOUNT'
const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
const EDIT_ACCOUNT = 'EDIT_ACCOUNT'



// export const getAccounts = (accounts) => {
//     return {
//         type: GET_ACCOUNTS,
//         accounts
//     }
// };

const getAccount = (account) => {
  return {
    type: GET_ACCOUNT,
    account,
  }
}

const deleteAccount = (account) => {
  return {
    type: DELETE_ACCOUNT,
    account,
  }
}

const editAccount = (account) => {
  return {
    type: EDIT_ACCOUNT,
    account
  }
}




// export const fetchAccounts = () => {
//     return async (dispatch) => {
//         try{
//         const token = window.localStorage.getItem('token');
//         if(token){
//             const { data } = await axios.get('/api/accounts', {
//                 headers: {
//                     authorization: token,
//                 },
//             })
//             dispatch(getAccounts(data))
//         }
//         }catch(error){
//             console.log('FETCH ACCOUTS THUNK ERROR ', error);
//         }
//     }
// };

export const getAccountThunk = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios.get('/api/admin/accounts')
      dispatch(getAccount(data))
    }
  } catch (error) {
    console.log('uh oh something went wrong getting accounts.', error);
  }
}

export const deleteAccountThunk = (accountId) => {
  try {
    return async (dispatch) => {
      const { data } = await axios.delete(`/api/admin/accounts/${accountId}`)
      dispatch(deleteAccount(data))
    }
  } catch (error) {
    console.log('uh oh something went wrong deleting accounts.', error);

  }
}

export const editAccountThunk = (account) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/admin/accounts/${account.id}`, account)
      dispatch(editAccount(data))
    } catch (error) {
      console.log('uh oh something went wrong editing the account.', error);

    }
  }
}



const accountsReducer = (state = [], action) => {
  switch (action.type) {
    // case GET_ACCOUNTS:
    //     return action.accounts
    case GET_ACCOUNT:
      return action.account
    case EDIT_ACCOUNT:
      return [...state, action.account]
    case DELETE_ACCOUNT:
      return state.filter((account) => account.id !== action.account.id);
    default:
      return state
  }
}

export default accountsReducer;