import { createSlice } from "@reduxjs/toolkit";
import { cartActions } from "./cartUI";

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
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
          },
    }
});

export const fetchCartData = ()=> {
    return async(dispatch) =>{

        const getData = async()=>{
            const response = await fetch('https://react-http-d7746-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
                method:'GET',
            });
    
            return response.da
        }

        const responseData = await getData();

        console.log("responseData ::::::",responseData);
        
    }
}



export const sendCartData = (cart)=> { //action creator which return a function
    return async (dispatch) => {
        dispatch(cartActions.showNotification({
            status:'pending',
            title:'Sending',
            message:'sending cart data'
        }));

        const sendRequest = async()=> {
            const response = await fetch('https://react-http-d7746-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
                method:'PUT',
                body:JSON.stringify(cart)
            });
        
            if(!response.ok){
                throw new Error("Sending Cart Data failed.");
               
            }
        }

        try{
            await sendRequest();
            dispatch(cartActions.showNotification({
                status:'success',
                title:'Success',
                message:'sent cart data'
            }));

        }catch(error){
            dispatch(cartActions.showNotification({
                status:'error',
                title:'Error',
                message:'sending cart data failed'
            }));
        }
       
    }
}

export default cartLogicReducer.reducer;

export const cartLogicActions = cartLogicReducer.actions;
