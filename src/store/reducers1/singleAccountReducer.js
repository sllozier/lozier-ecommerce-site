// import axios from "axios";

// const ADD_ACCOUNT = 'ADD_ACCOUNT';
// const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

// export const addAccount = (account) => {
//     return {
//      type: ADD_ACCOUNT,
//      account,
//     } 
// };

// export const updateAccount = (account) => {
//     return{
//         type: UPDATE_ACCOUNT,
//         account,
//     }
// };



// export const createAccount = (accountInfo) => {
//     return async (dispatch) => {
//         try {
//             const { data: account } = await axios.post('/api/accounts', {
//                 ...accountInfo,
//             });
//             if(account){
//                 attemptPasswordLogin({
//                     username: accountInfo.username,
//                     password: accountInfo.password,
//                 })
//                 dispatch(addAccount(account));
//             }
//         } catch (error) {
//             console.log('CREATE ACCOUNT THUNK ERROR ', error);
//         }
//     }
// };

// export const updateThisAccount = (accountInfo, accountId) => {
//     return async (dispatch) => {
//         try{
//             const token = window.localStorage.getItem('token');
//             const { data: account } = await axios.put(`/api/accounts/${accountId}`, accountInfo,
//             {
//                 headers: {
//                     authorization: token,
//                 },
//             }
//             );
//             dispatch(updateAccount(account));
//         }catch(error){
//             console.log('UPDATE ACCOUNT THUNK ERROR ', error);
//         }
//     }
// }

// export const singleAccountReducer = (state = {}, action) => {
//     switch (action.type) {
//         case ADD_ACCOUNT:
//             return action.account;
//             case UPDATE_ACCOUNT:
//             return action.account;
//             default:
//             return state;
//     }
// };