// import React, {useState} from "react";
// import { Button, Container, Row, Col, Form, Card, Table, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from '../components/Header';
// import { FcPlus, FcEditImage } from "react-icons/fc";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import moment from 'moment';
// import RowEdit from "../components/RowEdit";
// import { NavLink } from 'react-router-dom';
// import { VscChevronRight } from "react-icons/vsc";


import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import GameItem from "../components/GameHome";

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

 

 



 
  


  return (
    <>
    <ToastContainer />
      <Header />
       <h1 style={{fontSize:70,textAlign:'center',marginTop:15,color:'#ffff'}}>Games</h1>
    <Container  >


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

