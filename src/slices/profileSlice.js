import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
  logoutModal:false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
        setUser(state, value){
            state.user=value.payload;
        },
        setLogoutModal(state, value){
          // console.log("Himanshu")
          state.logoutModal=value.payload;
        }
  },
})

// Action creators are generated for each case reducer function
export const {setUser, setLogoutModal} = profileSlice.actions

export default profileSlice.reducer