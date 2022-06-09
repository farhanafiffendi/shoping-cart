import { useContext } from "react";
import "./CartItem.css";
import CartContext from "../context/cart/CartContext";
import convertRupiah from 'rupiah-format'

const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <li className='CartItem__item'>
      <img src={item.image} alt='' />
      <div>
        {item.name} {convertRupiah.convert(item.price)}
      </div>
      <button className='CartItem__button' onClick={() => removeItem(item._id)}>
        Remove
      </button>
    </li>
  );
};

export default CartItem;
