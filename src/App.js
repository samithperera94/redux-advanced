import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {cartActions} from "./store/cartUI";
import Notification from './components/UI/Notification';


let isInitial = true; //avaoiding netwok call at the begginging 

function App() {
  const isShown = useSelector(state => {
    return state.cartUI.isShown;
  });
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cartLogic);
  const notification = useSelector(state => state.cartUI.notification);

  useEffect(()=>{
    const sendCartData = async()=>{
      dispatch(cartActions.showNotification({
        status:'pending',
        title:'Sending',
        message:'sending cart data'
      }));
      const response = await fetch('https://react-http-d7746-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
        method:'PUT',
        body:JSON.stringify(cart)
      });

      if(!response.ok){
        throw new Error("Sending Cart Data failed.");
       
      }

      // const responseData = await response.json();

      dispatch(cartActions.showNotification({
        status:'success',
        title:'Success',
        message:'sent cart data'
      }))
    }

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(cartActions.showNotification({
        status:'error',
        title:'Error',
        message:'sending cart data failed'
      }))
    });
   
  },[cart,dispatch])
  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {isShown && <Cart />}
        <Products />
      </Layout>
    </>
    
  );
}

export default App;
