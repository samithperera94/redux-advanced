import { configureStore } from "@reduxjs/toolkit";
import cartUIReducer from "./cartUI";
import cartLogicReducer from "./cartLogic";


const store = configureStore({
    reducer:{
        cartUI:cartUIReducer,
        cartLogic: cartLogicReducer
    }
});

export default store;