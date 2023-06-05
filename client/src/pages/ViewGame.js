import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import axios from "axios";

export default function ViewGame(props) {
  const location = useLocation();
  const { gameName, gamePrice, genreName, gameDescription, gameImage } =
    location.state;

  return (
    <Container style={{justifyContent:'center',alignItems:'center'}}>
      <Row>
        <Col sm={12} md={6}>

          <div style={{color:'#ffff',marginTop:'50%'}}>
            <h1>Game Details</h1>
            <p>Game Name: {gameName}</p>
            <p>Price: ${gamePrice}</p>
            <p>genreName: {genreName}</p>
            <p>gameDescription: {gameDescription}</p>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div style={{marginTop:'40%'}}>
            <img src={gameImage} alt="Game Image" className="img-fluid" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}



