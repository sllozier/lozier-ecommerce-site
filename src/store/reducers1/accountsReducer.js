import axios from "axios";

const GET_ACCOUNTS = 'GET_ACCOUNTS';



export const getAccounts = (accounts) => {
    return {
        type: GET_ACCOUNTS,
        accounts
    }
};



export const fetchAccounts = () => {
    return async (dispatch) => {
        try{
        const token = window.localStorage.getItem('token');
        if(token){
            const { data } = await axios.get('/api/accounts', {
                headers: {
                    authorization: token,
                },
            })
            dispatch(getAccounts(data))
        }
        }catch(error){
            console.log('FETCH ACCOUTS THUNK ERROR ', error);
        }
    }
};




const accountsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ACCOUNTS:
            return action.accounts
        default:
            return state
    }
}

export default accountsReducer;