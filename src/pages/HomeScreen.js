import React, { useState, useEffect, useContext } from 'react'
import "./HomeScreen.css";
import ProductCard from "../components/ProductCard";
import { API } from '../config/api';
import Spinner from 'react-bootstrap/Spinner';
import Nav from '../components/Nav';
import { ShoppingCartContext } from '../App';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";

const HomeScreen = () => {

  const addProductToCart = (product) => {
    setCart([...cart, { ...product }]);
    setShowToast(true);
  };

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [cart, setCart] = useContext(ShoppingCartContext);
  console.log(cart);

  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await API.get('/products', config);
      setPosts(response.data.data);
      setTimeout(() => {
        setLoading(false)
      })
    }
    loadPosts();
  }, []);

  return (
    <>
      <ToastContainer
        style={{ zIndex: "1" }}
        className="p-3 position-fixed"
        position={"top-center"}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Successful</strong>
          </Toast.Header>
          <Toast.Body>Product added to cart.</Toast.Body>
        </Toast>
      </ToastContainer>
      <Nav cart={cart} />
      <div className='products__wrapper'>
        {loading && <Spinner animation="border" />}
        {posts.map((product) => (
          <ProductCard key={product.id}
            product={product}
            addProductToCart={addProductToCart} />
        ))}
      </div>
    </>

  );
};

export default HomeScreen;
