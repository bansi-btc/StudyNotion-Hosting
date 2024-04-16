import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem("token"),
  userDetails:localStorage.getItem("userDetails")?JSON.parse(localStorage.getItem("userDetails")):{},
  // token:"Bansi"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        setToken(state, value){
            state.token=value.payload;
        },
        setUserDetails(state, value){
            state.userDetails=value.payload
        }
  },
})

// Action creators are generated for each case reducer function
export const {setToken,setUserDetails} = authSlice.actions

export default authSlice.reducer