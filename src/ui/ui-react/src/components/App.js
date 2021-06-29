import React, {Component, useState} from 'react';
import {Alert, Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: 0
        };
    }



    async componentDidMount() {

        await this.loadWeb3()
    }

    async loadWeb3() {
        if (window.ethereum) {
    console.log("eth11")
        }
        else if (window.web3) {

        }
        else {

            // window.alert()


            if (this.state.show==0) {
                return (
                    <Alert variant="danger" onClose={() => this.setState({show:1})}  dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            Change this and that and try again. Duis mollis, est non commodo
                            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                            Cras mattis consectetur purus sit amet fermentum.
                        </p>
                    </Alert>
                );
            }
            return <Button onClick={() => this.state.show==0}>Show Alert</Button>;
        }
    }
    render( ) {
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