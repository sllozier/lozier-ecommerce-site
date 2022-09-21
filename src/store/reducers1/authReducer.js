import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

const SET_AUTH = 'SET_AUTH';

const setAuth = (auth) => ({
    type: SET_AUTH,
    auth,
});

export const authUser = (username) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            if (token) {
                const res = await axios.get('/api/auth/authuser', {
                    headers: {
                        authorization: token,
                    },
                });
                dispatch(setAuth(res.data));
            }
        } catch (error) {
            console.log('AUTHUSER THUNK ERROR ', error)
        }
    };
};

export const authenticate = (username, password, method) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/api/auth/${method}`, { username, password });
            window.localStorage.setItem(TOKEN, res.data.token);
            dispatch(authUser(username));
            history.push('/')
        } catch (error) {
            console.log('AUTHENTICATE THUNK ERROR ', error)
        }
    }
};

export const signup = (account) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/api/auth/signup`, account)
            window.localStorage.setItem(TOKEN, res.data.token)
            dispatch(authUser())
            history.push('/');
        } catch (error) {
            console.log('SIGNUP THUNK ERROR ', error);
        }
    }
}

export const logout = () => {
    window.localStorage.removeItem(TOKEN);
    history.push('/');
    return {
        type: SET_AUTH,
        auth: {},
    };
};

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_AUTH:
            return action.auth;
        default:
            return state;
    }
};
//checking merge stuffffss
