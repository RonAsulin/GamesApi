import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const baseURL = "http://localhost:3001/api";
  
  const fetch = () => {
     const token =  localStorage.getItem("token")
    axios
      .get(baseURL + "/account/admin", {validateStatus: (num) => num >= 200,headers: {
        authorization: `Bearer ${JSON.parse(token)}`,   
      }})
      .then((response) => {
        if(response.status === 200)
        {
            console.log(response.data);
            setIsAdmin(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetch();
    
  }, []);

  const handleDisconnect = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src="../../logo.png" style={{ width: 140 }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            {isAdmin && <Nav.Link href="/manager">Management</Nav.Link>}
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
          <Button
            style={{ marginLeft: 10 }}
            onClick={handleDisconnect}
            variant="outline-info"
          >
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
