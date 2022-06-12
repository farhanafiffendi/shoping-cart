import "./Cart.css";
import React, { useContext } from 'react'
import CartItem from './CartItem'
import convertRupiah from 'rupiah-format'
import { ShoppingCartContext } from '../App'

const Cart = ({ showCart, handleHideCart }) => {

  const [cart, setCart] = useContext(ShoppingCartContext);

  const total = (arr) => {
    return arr.reduce((cal, item) => {
      return cal + item.price * item.amount;
    }, 0);
  };

  const removeItem = (id) => {
    setCart((prev) => {
      return prev.reduce((cal, item) => {
        if (item.id === id) {
          if (item.amount === 1) return cal;

          return [...cal, { ...item, amount: item.amount - 1 }];
        }

        return [...cal, { ...item }];
      }, []);
    });
  };
  return (
    <>
      {showCart && (
        <div className='cart__wrapper'>
          <div style={{ textAlign: "right" }}>
            <i
              style={{ cursor: "pointer" }}
              className='fa fa-times-circle'
              aria-hidden='true'
              onClick={handleHideCart}
            ></i>
          </div>
          <div className='cart__innerWrapper'>
            {cart.length === 0 ? (
              <h4>Cart is Empty</h4>
            ) : (
              <ul>
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} removeItem={removeItem} />
                ))}
              </ul>
            )}
          </div>
          <div className='Cart__cartTotal'>
            <div>Cart Total</div>
            <div></div>
            <div style={{ marginLeft: 5 }}>
              {convertRupiah.convert(total(cart))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
