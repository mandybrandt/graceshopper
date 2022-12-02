import React, {useState, useEffect} from 'react';
import { ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItemCard } from '../components/index';
import {getCart} from '../api'

const Cart = ({ jwt, user}) => {
  const [cartProducts, setCartProducts] = useState([]);

  async function allCartProducts(jwt, user) {
    setCartProducts(await getCart(jwt, user));
  }

  useEffect(() => {
    allCartProducts();
  }, [user]);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='activities' title='Cart'></Tab>
      </Tabs>

      <ListGroup variant='flush'>

        {cartProducts ? (
          cartProducts.map(products => {
            return <CartItemCard products={products} />
          })
        ) : (
          <h1>No Products Found!</h1>
        )}
      </ListGroup>
<Link to="/Checkout">Submit</Link>
    </>
  );
};

export default Cart;
