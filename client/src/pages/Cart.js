import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);




  useEffect(() => {
    const cartItemsFromStorage =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cartItemsFromStorage);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.gamePrice, 0);
  };
   const handleCheckout = () => {
    // הודעת אישור
    alert("תודה רבה על הרכישה!");

    // מחיקת נתוני העגלה
    setCartItems([]);
    localStorage.removeItem("cartItems");
   
  };

  return (
    <Container>
      <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Row>
            {cartItems.map((item) => (
              <Col key={item.id} xs={12} md={6} lg={4}>
                <Card style={{ marginBottom: "10px" }}>
                 <Card.Img variant="top" src={item.gameImage} />
                  <Card.Body>
                    <Card.Title>{item.gameName}</Card.Title>
                    <Card.Text>${item.gamePrice}</Card.Text>
                      <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                        <FaTrash /> 
                      </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: "20px" }}>
            <h4>Total Price: ${calculateTotalPrice()}</h4>
            <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
