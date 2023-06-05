import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation} from 'react-router-dom';


import axios from 'axios';

export default function ViewGame(props) {
  const location = useLocation();
  const { gameName, genreId, gamePrice } = location.state;

  return (
    <div>
      <h1>Game Details</h1>
      <p>Game Name: {gameName}</p>
      <p>Genre: {genreId}</p>
      <p>Price: ${gamePrice}</p>
      {/* תוספת עיצוב ותוכן נוספים */}
    </div>
  );
}

