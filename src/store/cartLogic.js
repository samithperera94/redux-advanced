import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems : [],
    totalQuantity:0
}

const cartLogicReducer = createSlice({
    name:'cartLogic',
    initialState:initialCartState,
    reducers:{
        addToCart(state,action){
            const newItem = action.payload;
            const  existingItem = state.cartItems.find(item => item.id === newItem.id);
            if(existingItem){
                existingItem.quantity ++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                // state.cartItems[existingItem.id].quantity ++;
                // state.cartItems[existingItem.id].totalPrice = state.cartItems[existingItem.id].totalPrice +  state.cartItems[existingItem.id].price;
            }else{
                state.cartItems.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
            }
            state.totalQuantity ++;
        },
        removeFromCart(state,action){
            const itemId = action.payload;
            const existingItem = state.cartItems.find(item => item.id === itemId);
            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity --;
                    existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                }else{
                    state.cartItems = state.cartItems.filter((item)=>{
                        return item.id !== action.payload
                    });
                }
                
            }
            state.totalQuantity --;
        }
    }
});

export default cartLogicReducer.reducer;

export const cartLogicActions = cartLogicReducer.actions;
