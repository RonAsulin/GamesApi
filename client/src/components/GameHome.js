import React, { useState } from "react";
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameHome = (props) => {
  const baseURL = 'http://localhost:3001/api';
  const [isEditable, setIsEditable] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
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
    setCartItems(updatedCartItems);
  };

  const addToFavorites = () => {
    const favoriteItem = {
      id: Math.random().toString(36).substr(2, 9),
      gameName: props.game.gameName,
      gamePrice: props.game.gamePrice,
      gameImage: props.game.gameImage
    };

    const updatedFavoriteItems = [...favoriteItems, favoriteItem];
    setFavoriteItems(updatedFavoriteItems);
  };

  const removeFromFavorites = (id) => {
    const updatedFavoriteItems = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavoriteItems);
  };

  const nav = () => {
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

  const goToCart = () => {
    navigate('/cart');
  };

  const openFavoritesModal = () => {
    setShowFavoritesModal(true);
  };

  const closeFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  return (
    <>
      <Card style={{ marginTop: 12, height: 200 }}>
        <Container style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'start' }}>
          <div style={{ overflow: 'hidden', width: 200, height: 120 }}>
            <Card.Img src={props.game.gameImage} />
          </div>
          <div style={{ marginLeft: 15, width: 200 }}>
            <Card.Body>
              <Card.Title style={{ fontSize: 20 }}>{props.game.gameName}</Card.Title>
              <Card.Text>Genre: {props.game.genreId.genreName}</Card.Text>
              <Card.Text>
                <b style={{ fontSize: 30 }}>${props.game.gamePrice}</b>
              </Card.Text>
            </Card.Body>
          </div>
          <div>
            <Button variant="primary" style={{ marginLeft: 3 }} onClick={addCart}>
              <FaShoppingCart />
            </Button>

            <Button variant="primary" style={{ marginLeft: 3 }} onClick={addToFavorites}>
              <FaHeart />
            </Button>

            <Button variant="primary" style={{ marginLeft: 3 }} onClick={nav}>
              <FaEye />
            </Button>
          </div>
        </Container>
      </Card>

      <Modal show={showFavoritesModal} onHide={closeFavoritesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {favoriteItems.length > 0 ? (
            favoriteItems.map(item => (
              <div key={item.id}>
                <Card>
                  <Container style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ overflow: 'hidden', width: 80, height: 80 }}>
                      <Card.Img src={item.gameImage} />
                    </div>
                    <div style={{ marginLeft: 15 }}>
                      <Card.Body>
                        <Card.Title style={{ fontSize: 16 }}>{item.gameName}</Card.Title>
                        <Card.Text>
                          <b style={{ fontSize: 20 }}>${item.gamePrice}</b>
                        </Card.Text>
                      </Card.Body>
                    </div>
                    <div>
                      <Button variant="danger" onClick={() => removeFromFavorites(item.id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </Container>
                </Card>
              </div>
            ))
          ) : (
            <p>No favorite items</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={goToCart}>
            Go to Cart
          </Button>
          <Button variant="primary" onClick={closeFavoritesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameHome;

