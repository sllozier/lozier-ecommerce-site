import axios from 'axios';
import { getToken, removeToken, setToken } from '../../utils/HelperFunctions';
import  history from '../../utils/history';


const ADD_ACCOUNT = 'ADD_ACCOUNT';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';



export const addAccount = (account) => {
       return {
        type: ADD_ACCOUNT,
        account,
       } 
};

export const logIn = (auth) => {
    return{
        type: LOG_IN,
        auth,
    }
};



const logout = (auth) => {
   return {
    type: LOG_OUT,
    auth: {},
   }
};

export const updateAccount = (account) => {
    return{
        type: UPDATE_ACCOUNT,
        account,
    }
};


export const fetchAccountData = () => {
    return async (dispatch) => {
        try {
           const token = window.localStorage.getItem('token');
           console.log('THUNK TOKEN', typeof token);
            if (token) {
                const { data: accountInfo } = await axios.post('/api/auth', {}, {
                    headers: {
                        authorization: `Bearer: ${token}`,
                    },
                });
                //can add a fetchCart call here
                dispatch(logIn(accountInfo));
            }
        } catch (error) {
            console.log('AUTHUSER THUNK ERROR ', error)
        }
    };
};

export const attemptLogin = (auth) => {
    return async(dispatch) => {
        try{
            const { data: token } = await axios.post('/api/auth/login', auth);
            window.localStorage.setItem('token', token);
            dispatch(fetchAccountData());
            history.push('/');
        }catch(error){
            console.log('ATTEMPT PASSWORD THUNK ERROR ', error);
        }
    }
}

export const createAccount = (accountInfo) => {
    return async (dispatch) => {
        try {
            const { data: account } = await axios.post('/api/accounts', {
                ...accountInfo,
            });
            if(account){
                attemptLogin({
                    username: accountInfo.username,
                    password: accountInfo.password,
                })
                dispatch(addAccount(account));
            }
        } catch (error) {
            console.log('CREATE ACCOUNT THUNK ERROR ', error);
        }
    }
}

export const logoutAccount = () => {
    return(dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(logout())
    }   
};

export const updateThisAccount = (accountInfo, accountId) => {
    return async (dispatch) => {
        try{
            const token = window.localStorage.getItem('token');
            const { data: account } = await axios.put(`/api/accounts/${accountId}`, accountInfo,
            {
                headers: {
                    authorization: token,
                },
            }
            );
            dispatch(updateAccount(account));
        }catch(error){
            console.log('UPDATE ACCOUNT THUNK ERROR ', error);
        }
    }
}

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ACCOUNT:
           return action.account;
        case LOG_IN:
            return action.auth;
        case LOG_OUT:
            return action.auth;
         case UPDATE_ACCOUNT:
             return action.account;
        default:
            return state;
    }
};
//checking merge stuffffss
