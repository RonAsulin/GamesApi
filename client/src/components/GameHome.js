import React, {useState} from "react";
import { Button,Container, Row, Col, Form, Card ,} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const GameHome = props => {

    const baseURL = 'http://localhost:3001/api';
    const [isEditable, setIsEditable] = useState(false);
    const [gameName, setGameName] = useState(props.game.gameName);
    const [gamePrice, setGamePrice] = useState(props.game.gamePrice)
    const navigate = useNavigate();
const nav = async () => {
  navigate('/viewGame', {
    state: {
      gameName: props.game.gameName,
      _id: props.game._id,
      gamePrice: props.game.gamePrice
    }
  });
};
    const updateGame = async() => {

        const response = await fetch(baseURL + "/updateGame/" + props.game._id, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                gameName: gameName,
                gamePrice: gamePrice,
                isAvailable: props.game.isAvailable,
                genreId: props.game.genreId,
                gameDescription: props.game.gameDescription,
                gameImage: props.game.gameImage
            })
          });
          const data = await response.json();
          setIsEditable(false);
          props.loadAllGames();
    }



    return (

<>
  <Card style={{ marginTop: 12,height:200 }}>
    <Container style={{ display: 'flex', alignItems: 'center', height:'100%' ,justifyContent:'start'}}>
      <div style={{overflow:'hidden', width:200, height:120}}>
        <Card.Img  src={props.game.gameImage} />
      </div>
      <div style={{marginLeft:15,width:200}} >
        <Card.Body>
          <Card.Title style={{ fontSize: 20 }}>{props.game.gameName}</Card.Title>
          <Card.Text>Genre: {props.game.genreId.genreName}</Card.Text>
          <Card.Text>
            <b style={{ fontSize: 30 }}>${props.game.gamePrice}</b>
          </Card.Text>
        </Card.Body>
      </div>
      <div  >
        <Button variant="primary" style={{marginLeft:3}} onClick={() => setIsEditable(true)}>Cart</Button>
        <Button variant="primary" style={{marginLeft:3}} onClick={() => setIsEditable(true)}>Fav</Button>
         <Button variant="primary" style={{marginLeft:3}} onClick={() => nav()}>View</Button>
      </div>
    </Container>
  </Card>
</>

    )
}

export default GameHome;


