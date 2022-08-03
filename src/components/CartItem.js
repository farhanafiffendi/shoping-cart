import "./CartItem.css";
import convertRupiah from 'rupiah-format'

const CartItem = ({ item, removeItem }) => {
  return (
    <li className='CartItem__item'>
      <img src={item.image} alt='' />
      <div>
        {item.name} {convertRupiah.convert(item.price)}
      </div> <br />
      <div>
        {item.amount}
      </div>
      <button className='CartItem__button' onClick={() => removeItem(item.id)}>
        Remove
      </button>
    </li>
  );
};

export default CartItem;
