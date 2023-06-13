import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    isShown : false,
    items : []
}

const cartUIReducer = createSlice({
    name:'cartUI',
    initialState: initialCartState,
    reducers:{        
        toggleCart(state){
            state.isShown = !state.isShown;
        },
    }
});

export const cartActions = cartUIReducer.actions;
export default cartUIReducer.reducer;