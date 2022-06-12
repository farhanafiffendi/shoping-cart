import "./ProductCard.css";
import convertRupiah from 'rupiah-format'

const ProductCard = ({ product, addProductToCart }) => {
  // const { addToCart } = useContext(CartContext);

  return (
    <div className='productCard__wrapper'>
      <div>
        <img className='productCard__img' src={product.image} alt='' />
        <h4>{product.name}</h4>
        <div className='ProductCard__price'>
          <h5>{convertRupiah.convert(product.price)}</h5>
        </div>
        <div className='ProductCard__Rateing'>
        </div>
        <button
          className='ProductCard__button'
          onClick={() => addProductToCart(product)}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
