import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    isShown : false,
    notification: null
}

const cartUIReducer = createSlice({
    name:'cartUI',
    initialState: initialCartState,
    reducers:{        
        toggleCart(state){
            state.isShown = !state.isShown;
        },
        showNotification(state,action){
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
});

export const cartActions = cartUIReducer.actions;
export default cartUIReducer.reducer;