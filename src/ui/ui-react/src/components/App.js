import React, {Component, useState} from 'react';
import {Alert, Button, Container, Form, Nav, Navbar, NavDropdown, ResponsiveEmbed} from "react-bootstrap";
import FormFileInput from "react-bootstrap/FormFileInput";
import ReactPlayer from "react-player";
import detectEthereumProvider from '@metamask/detect-provider';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buffer: null,
            fileHash: null,
            walletIsFound: false
        };
    }

    walletNotFound = (e) => {
        this.setState({walletIsFound: false})
    }

    walletFound = (e) => {
        this.setState({walletIsFound: true})
    }

    alertDismissibleExample() {

        if(this.state.walletIsFound===false) {
            return (
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p> Please use Metamask wallet!
                    </p>
                </Alert>
            );
        }
    }

    async componentDidMount() {

        await this.loadWeb3()
        await this.loadBlockchainData()

    }

    async loadWeb3() {
        const provider = await detectEthereumProvider();

        function walletFound() {
            console.log("")

        }

        if (provider) {
            console.log(provider)
            let currentAccount = null
            provider
                .request({ method: 'eth_accounts' })
                .then(handleAccountsChanged)
                .catch((err) => {
                    // Some unexpected error.
                    // For backwards compatibility reasons, if no accounts are available,
                    // eth_accounts will return an empty array.

                    console.error(err);
                });


// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
            provider.on('accountsChanged', handleAccountsChanged);
            // handleAccountsChanged == () =>  {
            //
            // }

            // For now, 'eth_accounts' will continue to always return an array
            function handleAccountsChanged(accounts) {
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    
                    console.log('Please connect to MetaMask.');
                } else if (accounts[0] !== currentAccount) {
                    currentAccount = accounts[0];
                    console.log(provider.networkVersion);
                }
            }


            // From now on, this should always be true:
            // provider === window.ethereum
           // startApp(provider); // initialize your app
        } else {
           // App.this.setState({walletIsFound: false})
            console.log('Please install MetaMask!');
        }

        // if (typeof window.ethereum !== 'undefined') {
        //     console.log(window.ethereum.selectedAddress)
        //     this.setState({walletIsFound: true})
        // }
        // else {
        //     this.setState({walletIsFound: false})
        // }
    }




    async loadBlockchainData() {
        // const web3 = window.web3
        // // Load account
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })
        // const networkId = await web3.eth.net.getId()
        // const networkData = Meme.networks[networkId]
        // if(networkData) {
        //     const contract = web3.eth.Contract(Meme.abi, networkData.address)
        //     this.setState({ contract })
        //     const memeHash = await contract.methods.get().call()
        //     this.setState({ memeHash })
        // } else {
        //     window.alert('Smart contract not deployed to detected network.')
        // }
    }

    render( ) {
        return (
            <div>   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Video Of the Day</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
            </Navbar>
                {this.alertDismissibleExample()}
                <Container fluid={"md"} >
                    {/*https://ipsf.infura.io/ipfs/QmW8V2bkHdk3RcGb3AiTFnkkAsxpMnGAZPcipXh3qTqqtg*/}
                    < div style={{ width: 660, height: 'auto' }}>
                        <ReactPlayer url="https://ipfs.infura.io/ipfs/QmW8V2bkHdk3RcGb3AiTFnkkAsxpMnGAZPcipXh3qTqqtg"
                        controls={true}
                        />
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