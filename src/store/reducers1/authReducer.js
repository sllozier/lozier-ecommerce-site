import axios from 'axios';
import history from '../../utils/history';
import { fetchCart, accountAttachCart } from './cartReducer';


// const ADD_ACCOUNT = 'ADD_ACCOUNT';
// const LOG_IN = 'LOG_IN';
// const LOG_OUT = 'LOG_OUT';
// const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

const SET_AUTH = 'SET_AUTH';


const setAuth = (auth) => {
    return {
        type: SET_AUTH,
        auth,
    }
}
//

export const fetchAccountData = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            console.log('FETCH TOKEN', token)
            if (token) {
                const res = await axios.get('/auth', {
                    headers: {
                        authorization: token,
                    },
                });
               dispatch(fetchCart(res.data.id, 'empty'));
                dispatch(setAuth(res.data));
            }
        } catch (error) {
            console.log('AUTHUSER THUNK ERROR ', error)
        }
    };
};



export const attemptLogin = (authInfo) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/login', authInfo);
            console.log('THUNK DATA', res.data)
            window.localStorage.setItem('token', res.data);
            dispatch(fetchAccountData());
            localStorage.removeItem('UUID');
            history.push('/products');
        } catch (error) {
            console.log('ATTEMPT PASSWORD THUNK ERROR ', error);
        }
    }
}

export const createAccount = (authInfo) => {
    return async (dispatch) => {
        try {
            
            const res = await axios.post('/auth/signup', authInfo);
            window.localStorage.setItem('token', res.data.token);
            
            dispatch(accountAttachCart(res.data.id, localStorage.UUID));
        } catch (error) {
            console.log('CREATE ACCOUNT THUNK ERROR ', error);
        }
    }
}

export const logoutAccount = () => {
    window.localStorage.removeItem('token');
    history.push('/');
    return {
        type: SET_AUTH,
        auth: {},
    };
};

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

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case SET_AUTH:
            return action.auth;
        default:
            return state;
    }
};
//checking merge stuffffss
