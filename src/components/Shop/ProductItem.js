import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartLogicActions } from '../../store/cartLogic';

const ProductItem = (props) => {
  const { itemID,title, price, description } = props;
  const dispatch = useDispatch()

  const onClickHandler = ()=> {
    dispatch(cartLogicActions.addToCart({
      id: itemID,
      price: price,
      name: title
    }))
  }

  return (
    <li className={classes.item} key={itemID}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onClickHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
