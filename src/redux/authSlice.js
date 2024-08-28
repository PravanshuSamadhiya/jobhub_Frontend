import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading: false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        token : localStorage.getItem("Token") || null,
    },
    reducers:{
        setLoading:(state, action) => {
            state.loading = action.payload; 
        },
        setUser:(state,action) => {
            state.user = action.payload;       
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token'); 
        },
    }
});

export const {setLoading,setUser, clearUser , setToken} = authSlice.actions;
export default authSlice.reducer;