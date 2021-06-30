import React, {Component, useState} from 'react';
import {Alert, Button, Container, Form, Nav, Navbar, NavDropdown, ResponsiveEmbed} from "react-bootstrap";
import FormFileInput from "react-bootstrap/FormFileInput";
import ReactPlayer from "react-player";

class App extends Component {
    constructor(props) {
        super(props)
        this.state= {
            buffer: null
        };
    }

    async AlertDismissibleExample() {

            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                </Alert>
            );

        return <Button onClick={() => setShow(true)}>Show Alert</Button>;
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
           // setShow(true);
        }
    }
    render( ) {
        return (
            <div>   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Video Of the Day</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
            </Navbar>

                <Container fluid={"md"} >

                    {/*https://ipsf.infura.io/ipfs/QmW8V2bkHdk3RcGb3AiTFnkkAsxpMnGAZPcipXh3qTqqtg*/}
                    < div style={{ width: 660, height: 'auto' }}>
                        <ReactPlayer url="https://ipfs.infura.io/ipfs/QmW8V2bkHdk3RcGb3AiTFnkkAsxpMnGAZPcipXh3qTqqtg" />
                    </div>

                    <Form onSubmit={this.onFileSubmission}>
                        <Form.Group>
                            <Form.File
                                className="position-relative"
                                required
                                name="file"
                                label="File"
                                onChange={this.handleFileChange}
                                //  isInvalid={!!errors.file}
                                //   feedback={errors.file}
                                id="validationFormik107"
                                feedbackTooltip
                            />
                        </Form.Group>
                        <Button variant="outline-secondary" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Container>

            </div>

        );

    }

    handleFileChange=(event) =>{
        event.preventDefault();
        console.log("file captured");
        this.setBufferState({buffer: this.processFile(event)});

    };
    processFile(event) {
        let file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            var uint8View = new Uint8Array(reader.result);
            return uint8View;
        }
    }

    onFileSubmission = (event) => {
        event.preventDefault();
        console.log("submitting form")
    }
    setBufferState(state) {
        this.setState(state);
    }


}
export default App;