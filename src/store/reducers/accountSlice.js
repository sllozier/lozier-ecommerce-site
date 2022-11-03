import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: {
        accountList: [],
        accountData: {},
    },
    reducers: {
        getAccountList: (state, action) => {
            state.accountList = action.payload;
            return state;
        },
        getAccountData: (state, action) => {
            state.accountData = action.payload;
            return state;
        },
        _deleteAccount: (state, action) => {
            state.accountList = state.accountList.filter((account) =>
                account.id !== action.payload.id
                );
                return state;
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
            return state;
        },
    }
});

export default accountSlice.reducer;
export const {
    getAccountList,
    getAccountData,
    _deleteAccount,
} = accountSlice.actions;

//thunks go here//
export const fetchAccounts = () => {
    return async(dispatch) => {
        try{
           const { data: accountList } = await axios.get("/api/accounts");
           dispatch(getAccountList(accountList))
        }catch(error){
            console.log("FETCH ACCOUNTS ERROR", error);
        }
    }
};

export const fetchAccountData = (accountId) => async(dispatch) => {
        try{
            const token = window.localStorage.getItem('token');
            const { data: accountData } = await axios.get(`/api/accounts/${accountId}`, {
                headers: {
                    authorization: token
                },
            });
            dispatch(getAccountData(accountData));
        }catch(error){
            console.log("FETCH ACCOUNT DATA ERROR", error);
        }
    };


export const updateAccountData = (accountInfo, accountId) => async(dispatch) => {
        try{
            const { data: updatedAccount } = await axios.put(`/api/accounts/${accountId}`, accountInfo, accountId);
            dispatch(getAccountData(updatedAccount));
        }catch(error){
            console.log("UPDATE ACCOUNT ERROR", error);
        }
    };


export const deleteAccountData = (accoundId) => async(dispatch) => {
        try{
            const { data: deletedAccount } = await axios.delete(`/api/accounts/${accoundId}`);
            dispatch(_deleteAccount(deletedAccount));
            dispatch(logout());
        }catch(error){
            console.log("DELETE ACCOUNT DATA ERROR", error)
        }
    };
