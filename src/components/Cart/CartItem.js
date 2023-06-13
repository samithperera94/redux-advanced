import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartLogicActions } from '../../store/cartLogic';

const CartItem = (props) => {
  // console.log("props",props)
  const { id,title, quantity, total, price } = props.item;

  const dispatch = useDispatch();

  const onAddHandler =()=> {
    dispatch(cartLogicActions.addToCart({
      id: id,
      price: price,
      name: title
    }))
  }

  const onRemoveHandler = ()=> {
    dispatch(cartLogicActions.removeFromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onRemoveHandler}>-</button>
          <button onClick={onAddHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
