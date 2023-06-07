import React from "react";
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameHome = (props) => {
  const navigate = useNavigate();

  const addCart = () => {
    const cartItem = {
      id: Math.random().toString(36).substr(2, 9),
      gameName: props.game.gameName,
      gamePrice: props.game.gamePrice,
      gameImage: props.game.gameImage
    };

    const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...cartItemsFromStorage, cartItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // setCartItems(updatedCartItems); // No longer needed since we are storing cart items in localStorage
  };

  const nav = () => {
    navigate('/viewGame', {
      state: {
        gameName: props.game.gameName,
        gamePrice: props.game.gamePrice,
        genreName: props.game.genreId.genreName,
        gameDescription: props.game.gameDescription,
        gameImage: props.game.gameImage,
        gameId: props.game.gameId,
      }
    });
  };

  const addToFavorites = (game) => {
    const favoriteItem = {
      id: Math.random().toString(36).substr(2, 9),
      gameName: game.gameName,
      gamePrice: game.gamePrice,
      gameImage: game.gameImage
    };

    props.addToFavorites(favoriteItem);
  };

  return (
    <Card style={{ marginBottom: 10 }}>
      <Container style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <div style={{ overflow: 'hidden', width: 200, height: 120 }}>
          <Card.Img src={props.game.gameImage} />
        </div>
        <div style={{ marginLeft: 15, }}>
          <Card.Body>
            <Card.Title style={{ fontSize: 20 }}>{props.game.gameName}</Card.Title>
            <Card.Text>Genre: {props.game.genreId.genreName}</Card.Text>
            <Card.Text>
              <b style={{ fontSize: 30 }}>${props.game.gamePrice}</b>
            </Card.Text>
          </Card.Body>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="primary" style={{ marginLeft: 3 }} onClick={addCart}>
            <FaShoppingCart />
          </Button>
          <Button variant="primary" style={{ marginLeft: 3 }} onClick={() => addToFavorites(props.game)}>
            <FaHeart />
          </Button>
          <Button variant="primary" style={{ marginLeft: 3 }} onClick={nav}>
            <FaEye />
          </Button>
        </div>
      </Container>
    </Card>
  );
};

export default GameHome;
