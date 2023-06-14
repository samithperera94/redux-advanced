import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData,fetchCartData } from './store/cartLogic';


let isInitial = true; //avaoiding netwok call at the begginging 

function App() {
  const isShown = useSelector(state => {
    return state.cartUI.isShown;
  });
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cartLogic);
  const notification = useSelector(state => state.cartUI.notification);

  useEffect(()=>{
    
    if(isInitial){
      isInitial = false;
      dispatch(fetchCartData());
      return;
    }

    dispatch(sendCartData(cart));   
   
  },[cart,dispatch]);

  // useEffect(()=>{
  //   fetchCartData
  // },[])
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
