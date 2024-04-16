import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
  totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem('totalItems')):0,
  totalPrice:localStorage.getItem("totalPrice")?JSON.parse(localStorage.getItem('totalPrice')):0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
        addItem(state, value){
            state.cart.push(value.payload)
            state.totalPrice+=value.payload.price;
            // return state.cart;
        },
        removeItem(state, value){
            let obj_id=value.payload;
            let price=0;
            const newCart=state.cart.filter((ele)=>{
              return ele._id!==obj_id;
            })
            for(let value of state.cart){
              if(value._id!=obj_id){
                price+=value.price;
              }
            }
            state.totalPrice=price;
            state.cart=[...newCart];
        }
  },
})

// Action creators are generated for each case reducer function
export const {addItem, removeItem} = cartSlice.actions

export default cartSlice.reducer