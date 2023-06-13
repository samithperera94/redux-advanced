import classes from './CartButton.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { cartActions } from '../../store/cartUI';


const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cartLogic.totalQuantity)

  const cartToggleHandler = ()=> {
    dispatch(cartActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
