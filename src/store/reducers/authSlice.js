import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import history from '../../utils/history';
//import { fetchCart, accountAttachCart } from './cartSlice';
import { fetchCartData, accountAttachCart } from "./cartSlice";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {};
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      return state;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout, setErrorMsg } = authSlice.actions;

//thunks go here//

export const fetchAuthAccount = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await axios.get("/auth", {
        headers: {
          authorization: token,
        },
      });
      //console.log("RES DATA FETCH AUTH", res.data);
      dispatch(fetchCartData(res.data.id));
      dispatch(setAuth(res.data));
    }
  } catch (error) {
    console.log("FETCH AUTH ACCT ERROR", error);
  }
};

export const attemptLogin = (authInfo) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/login", authInfo);
    window.localStorage.setItem("token", res.data);
    //console.log("RES DATA LOG", res.data);
    dispatch(fetchAuthAccount());
    localStorage.removeItem("UUID");
  } catch (error) {
    console.log("ATTEMPT LOGIN ERROR", error);
  }
};

export const createAuthAccount = (authInfo) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/signup", authInfo);
    window.localStorage.setItem("token", res.data.token);
    const UUID = localStorage.UUID;
    dispatch(accountAttachCart(res.data.id, UUID));
  } catch (error) {
    console.log("CREATE AUTH ACCT ERROR", error);
  }
};
