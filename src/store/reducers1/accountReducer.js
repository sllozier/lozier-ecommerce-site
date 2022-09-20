import axios from "axios";

const GET_ACCOUNTS = 'GET_ACCOUNTS'

export const getAccounts = (accounts) => {
    return {
        type: GET_ACCOUNTS,
        accounts
    }
}

export const getAccountsThunk = () => {
    return async (dispatch) => {
        const data = await axios.get('/api/accounts')
        dispatch(getAccounts(data.data))
    }
}

const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_ACCOUNTS:
            return action.accounts
        default:
            return state
    }
}

export default reducer