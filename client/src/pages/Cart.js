import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import Header from "../components/Header";

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
    <>
      <Header />
      <Container style={{ backgroundColor: "#C6ECAE", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <h1 style={{ border: "2px solid #94C9A9", padding: "10px", color: "#885053", fontFamily: "Arial", fontSize: "50px" }}>Shopping Cart</h1>
        </div>
        {cartItems.length === 0 ? (
          <p style={{ color: "#777DA7", textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
        ) : (
          <div>
            <Row>
              {cartItems.map((item) => (
                <Col key={item.id} xs={12} md={6} lg={4}>
                  <Card style={{ marginBottom: "10px" }}>
                    <Card.Img
                      variant="top"
                      src={item.gameImage}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title style={{ color: "#885053", fontSize: "20px" }}>
                        {item.gameName}
                      </Card.Title>
                      <Card.Text style={{ color: "#777DA7", fontSize: "16px" }}>
                        ${item.gamePrice}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ backgroundColor: "#94C9A9", border: "none", marginRight: "5px" }}
                      >
                        <FaTrash style={{ marginRight: "5px" }} />
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <h4 style={{ color: "#885053", fontSize: "24px" }}>
                Total Price: ${calculateTotalPrice()}
              </h4>
              <Button
                variant="primary"
                onClick={handleCheckout}
                style={{ backgroundColor: "#94C9A9", border: "none", marginLeft: "10px" }}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
