import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import GameItem from "../components/GameHome";
import SearchFilter from "../components/SearchFilter";
import axios from 'axios';

function Dashboard() {
  const baseURL = "http://localhost:3001/api";
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const loadAllGames = async () => {
    try {
      const response = await axios.get(`${baseURL}/readAllGames`);
      setGames(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const loadGenres = async () => {
    try {
      const response = await axios.get(`${baseURL}/readAllGenres`);
      setGenres(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAllGames();
    loadGenres();
  }, []);

  const handleFilterSubmit = (filters) => {
    const filteredGames = games.filter((game) => {
      const isNameMatch = game.gameName.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const isPriceMatch = game.gamePrice >= filters.priceRange.min && game.gamePrice <= filters.priceRange.max;
      const isGenreMatch = filters.genreFilter === "" || game.genreId.genreName === filters.genreFilter;

      return isNameMatch && isPriceMatch && isGenreMatch;
    });

    setGames(filteredGames);
  };

  const handleReset = () => {
    loadAllGames();
  };

  const addToFavorites = (favoriteItem) => {
    const updatedFavoriteItems = [...favoriteItems, favoriteItem];
    setFavoriteItems(updatedFavoriteItems);
  };

  const removeFromFavorites = (id) => {
    const updatedFavoriteItems = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavoriteItems);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <h1 style={{ fontSize: 70, textAlign: 'center', marginTop: 15, color: '#ffff' }}>Games</h1>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row style={{ marginTop: 100 }}>
          <Col xs={5} md={2}>
            {favoriteItems.length > 0 && (
              <div style={{ position: 'sticky', top: 100 }}>
                <h3 style={{ marginLeft: 20 }}>Favorites</h3>
                {favoriteItems.map((item) => (
                  <div key={item.id} style={{ marginLeft: 20, marginBottom: 10 }}>
                    <p>{item.gameName}</p>
                    <p>Price: ${item.gamePrice}</p>
                    <img src={item.gameImage} alt={item.gameName} style={{ width: "100px" }} />
                    <button onClick={() => removeFromFavorites(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </Col>
          <Col xs={12} md={10} style={{ marginLeft: "auto", marginRight: 0 }}>
            <SearchFilter genres={genres} onFilterSubmit={handleFilterSubmit} onReset={handleReset} />
            <Row>
              {games.length > 0 ? (
                games.map((item) => (
                  <Col xl={5} xs={10} key={item.id}>
                    <GameItem
                      game={item}
                      addToFavorites={addToFavorites}
                      favoriteItems={favoriteItems}
                      removeFromFavorites={removeFromFavorites}
                    />
                  </Col>
                ))
              ) : (
                <p>No games found</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
