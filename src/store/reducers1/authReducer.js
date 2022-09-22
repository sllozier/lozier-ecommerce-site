import axios from 'axios';




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

export const logIn = (token) => {
    return{
        type: LOG_IN,
        token,
    }
};



const logout = (token) => {
   return {
    type: LOG_OUT,
    token: {},
   }
};

export const updateAccount = (account) => {
    return{
        type: UPDATE_ACCOUNT,
        account,
    }
};


export const accountLoginAttempt = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token')
            if (token) {
                const { data: accountInfo } = await axios.post('/api/auth',{}, {
                    headers: {
                        authorization: token,
                    },
                });
                dispatch(logIn(accountInfo));
            }
        } catch (error) {
            console.log('AUTHUSER THUNK ERROR ', error)
        }
    };
};

export const attemptPasswordLogin = (loginInfo) => {
    return async(dispatch) => {
        try{
            const { data: token } = await axios.post('/api/auth/login', loginInfo);
            window.localStorage.setItem('token', token);
            dispatch(accountLoginAttempt());
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
                attemptPasswordLogin({
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
        dispatch(logout());
        window.localStorage.removeItem('token');
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
            return action.token;
        case LOG_OUT:
            return action.token;
        case UPDATE_ACCOUNT:
            return action.account;
        default:
            return state;
    }
};
//checking merge stuffffss
