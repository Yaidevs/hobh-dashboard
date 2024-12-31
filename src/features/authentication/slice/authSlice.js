import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: Cookies.get("token") || null,
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("isAuthenticated", true);
      Cookies.set("token", state.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.setItem("isAuthenticated", false);
      Cookies.remove("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
