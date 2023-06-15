import { cartActions } from "./cartUI";
import { cartLogicActions } from "./cartLogic";


export const fetchCartData = ()=> {
    return async(dispatch) =>{

        const getData = async()=>{
            const response = await fetch('https://react-http-d7746-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');
    
            if(!response.ok){
                throw new Error("Fetching Cart Data failed.");
            }
            const data = await response.json();
            return data;
        }

        try{
            const cartData = await getData();
            dispatch(cartLogicActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity || 0
            }));
        }catch(error){
            dispatch(cartActions.showNotification({
                status:'error',
                title:'Error',
                message:'fetching cart data failed'
            }));
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
                body:JSON.stringify({
                    items:cart.items,
                    totalQuantity:cart.totalQuantity
                })
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