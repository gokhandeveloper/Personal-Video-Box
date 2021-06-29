import React, { Component } from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Video Of the Day</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            </Navbar.Collapse>
        </Navbar>

        );
    }


}
export default App;