import React from "react";
import { Navbar,Container,NavDropdown, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import mongoose from 'mongoose';
    

const Header = props => {
    const navigate = useNavigate();
        const handleDisconnect = () => {
    // התנתקות ממסד הנתונים MongoDB
            localStorage.clear() 
        navigate('/');
    }
    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">
                <img src="../../logo.png" style={{width:140}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard">Home</Nav.Link>
                <Nav.Link href="/manager">Management</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
            </Nav>
             <Button style={{marginLeft:10}} onClick={handleDisconnect}  variant="outline-info">Log Out</Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;