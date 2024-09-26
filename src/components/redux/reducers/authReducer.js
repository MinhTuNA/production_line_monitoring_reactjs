import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    auth: false,
    id: null,
    name: null,
    phoneNumber: null,
    email: null,
    role: null,
  },
  reducers: {
    
    setAuth:(state) => {
      state.auth = true;
    },
    clearAuth:(state) => {
      state.auth = false;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    clearId: (state) => {
      state.name = null;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    clearName: (state) => {
      state.name = null;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    clearPhoneNumber: (state ) => {
      state.phoneNumber = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearRole: (state) => {
      state.role = null;
    },
  },
});

export const {
  setId,
  clearId,
  setName,
  clearName,
  setPhoneNumber,
  clearPhoneNumber,
  setEmail,
  clearEmail,
  setRole,
  clearRole,
  setAuth,
  clearAuth,
} = authSlice.actions;
export default authSlice.reducer;
