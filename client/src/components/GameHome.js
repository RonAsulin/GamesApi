import React, { useState } from "react";
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameHome = props => {
  const baseURL = 'http://localhost:3001/api';
  const [isEditable, setIsEditable] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

 const addCart = async () => {
  const cartItem = {
    id: Math.random().toString(36).substr(2, 9),
    gameName: props.game.gameName,
    gamePrice:props.game.gamePrice,
    gameImage: props.game.gameImage
  };

  const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCartItems = [...cartItemsFromStorage, cartItem];
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  setCartItems(updatedCartItems);
};

  const nav = async () => {
    navigate('/viewGame', {
      state: {
        gameName: props.game.gameName,
        gamePrice: props.game.gamePrice,
        genreName: props.game.genreId.genreName,
        gameDescription: props.game.gameDescription,
        gameImage: props.game.gameImage
      }
    });
  };

  return (
    <>
      <Card style={{ marginTop: 12, height: 200 }}>
        <Container style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'start' }}>
          <div style={{ overflow: 'hidden', width: 200, height: 120 }}>
            <Card.Img src={props.game.gameImage} />
          </div>
          <div style={{ marginLeft: 15, width: 200 }} >
            <Card.Body>
              <Card.Title style={{ fontSize: 20 }}>{props.game.gameName}</Card.Title>
              <Card.Text>Genre: {props.game.genreId.genreName}</Card.Text>
              <Card.Text>
                <b style={{ fontSize: 30 }}>${props.game.gamePrice}</b>
              </Card.Text>
            </Card.Body>
          </div>
          <div  >
        <Button variant="primary" style={{ marginLeft: 3 }} onClick={addCart}>
          <FaShoppingCart /> 
        </Button>

        <Button variant="primary" style={{ marginLeft: 3 }} onClick={() => setIsEditable(true)}>
          <FaHeart /> 
        </Button>

        <Button variant="primary" style={{ marginLeft: 3 }} onClick={nav}>
          <FaEye /> 
        </Button>
          </div>
        </Container>
      </Card>
    </>
  )
}

export default GameHome;

