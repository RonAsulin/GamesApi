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
  const [games, setAllGames] = useState([]);
  const [genres, setAllGenres] = useState([]);


  const loadAllGames = async () => {
    const response = await fetch(baseURL + "/readAllGames", {
      method: "GET",
    });
    const data = await response.json();
    setAllGames(data.message);
  };
  const loadGenres = async () => {
    const response = await fetch(baseURL + "/readAllGenres", {
      method: "GET",
    });
    const data = await response.json();
    setAllGenres(data.message);
  };
  useEffect(() => {
    loadAllGames();
    loadGenres();
  }, []);
   const handleFilterSubmit = (filters) => {
    // Perform filtering based on the submitted filters
    // You can update the games state with the filtered results
    // For example:
    const filteredGames = games.filter((game) => {
      // Filter by game name
      const isNameMatch = game.gameName.toLowerCase().includes(filters.searchQuery.toLowerCase());
      // Filter by price range
      const isPriceMatch = game.gamePrice >= filters.priceRange.min && game.gamePrice <= filters.priceRange.max;
      // Filter by genre
      const isGenreMatch = filters.genreFilter === "" || game.genreId.genreName === filters.genreFilter;

      return isNameMatch && isPriceMatch && isGenreMatch;
    });

    // Update the games state with the filtered results
    setAllGames(filteredGames);
  };
    const handleReset = () => {
    loadAllGames();
  };
  

  return (
    <>
    <ToastContainer />
      <Header />
       <h1 style={{fontSize:70,textAlign:'center',marginTop:15,color:'#ffff'}}>Games</h1>
    <Container  >
          <SearchFilter genres={genres} onFilterSubmit={handleFilterSubmit} onReset={handleReset} />
        
          
      <Row style={{ marginTop: 100 }}>



        <Col xl={12} xs={12}>
          <Row>
            {games.length > 0 ? (
              games.map((item) => (
                <Col xl={6} xs={12}>
                  <GameItem
                    game={item}
                    loadAllGames={loadAllGames}
                  />
                </Col>
              ))
            ) : (
              <p>NOPE</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
     </>
  );
}

export default Dashboard;

