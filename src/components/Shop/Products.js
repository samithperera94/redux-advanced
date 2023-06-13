import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    itemID:1,
    title:'My first Book',
    price:6,
    description:'This is a first product - amazing!'
  },
  {
    itemID:2,
    title:'My second Book',
    price:8,
    description:'This is a first product - amazing!'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
      {DUMMY_PRODUCTS.map(item => {
          return(<ProductItem 
            key={item.itemID}
            itemID={item.itemID}
            title={item.title}
            price={item.price}
            description={item.description}
          />)
        })}
               
      </ul>
    </section>
  );
};

export default Products;
