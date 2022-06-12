import React, { useContext } from 'react'
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ShoppingCartContext } from "../App";
import ProductCard from './ProductCard';

const ShoppingCartItem = ({ product, removeProduct }) => {
  return (
    <Row className="mb-4">
      <Col>
        <img className="w-100" src={product.image} />
      </Col>

      <Col>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
      </Col>

      <Col>
        <Button variant="primary" onClick={() => removeProduct(product)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export const CartShop = () => {

  const [cart, setCart] = useContext(ShoppingCartContext);
  console.log(cart);
  const history = useNavigate();

  const totalCost = cart.reduce((sum, product) => sum + product.cost, 0);

  const removeProduct = (product) => {
    setCart(cart.filter((productInCart) => productInCart !== product));
    return (
      <>
        <Container>
          <Row className="mb-4">
            <Col>
              <h1>Shopping Cart ({cart.length} items in cart)</h1>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h1>Total cost ${totalCost}</h1>
              <Button variant="secondary">
                Check Out
              </Button>
            </Col>
          </Row>

          {cart.map((product) => (
            <ShoppingCartItem key={product.id} product={product} removeProduct={removeProduct} />
          ))}
        </Container>
      </>
    )
  }
}
