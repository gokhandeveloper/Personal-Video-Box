import React, {Component, useState} from 'react';
import {Alert, Button, Container, Form, Nav, Navbar, NavDropdown, ResponsiveEmbed} from "react-bootstrap";
import FormFileInput from "react-bootstrap/FormFileInput";
import ReactPlayer from "react-player";
import detectEthereumProvider from '@metamask/detect-provider';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            blockchain: '',
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

        await this.loadMetaMaskWallet()
        await this.loadBlockchainData()

    }

    async loadMetaMaskWallet() {
        const provider = await detectEthereumProvider();

        if (provider) {
            console.log(provider)
            let currentAccount = null
            provider
                .request({ method: 'eth_accounts' })
                .then(
                    this.getAccount(currentAccount, provider)
                        )

                .catch((err) => {
                    this.walletFound(false)
                    console.error(err);
                });

            provider.on('accountsChanged', this.getAccount);

        } else {
            console.log('Please install MetaMask!');
        }

    }

    getAccount(currentAccount, provider) {
        return accounts => {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts

                console.log('Please connect to MetaMask.');
            } else if (accounts[0] !== currentAccount) {
                currentAccount = accounts[0];
                console.log(provider.selectedAddress);
                this.setState({account: provider.selectedAddress});
                this.setState({blockchain: provider.networkVersion});
                this.walletFound(true)
            }
        };
    }

    async loadBlockchainData() {
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
               <div style={{color:"white"}}>{this.state.account} </div>
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