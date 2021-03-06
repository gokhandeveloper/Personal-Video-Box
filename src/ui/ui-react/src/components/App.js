import React, {Component} from 'react';
import {Alert, Button, Container, Form, Navbar} from "react-bootstrap";
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
            walletIsFound: false,
            issue:""
        };
    }

    walletNotFound = (e) => {
        this.setState({walletIsFound: false})
    }

    walletFound = (e) => {
        this.setState({walletIsFound: true})
    }

    alert(issue) {
        if(this.state.walletIsFound===false) {
            return (
                <Alert variant="danger">
                    <Alert.Heading>Wallet issue</Alert.Heading>
                    <p>{issue}</p>
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
                .then(this.getAccount(currentAccount, provider))
                .catch((err) => {
                    this.walletNotFound()
                    console.error(err);
                    this.setState({issue:"Issue occured with metamask"+err })
                });

            provider.on('accountsChanged', this.getAccount(currentAccount, provider));

        } else {
            console.log('Please install MetaMask!');
            this.setState({issue:"Please install MetaMask!" })
        }
    }

    getAccount(currentAccount, provider) {
        return accounts => {
            if (this.walletIsLockedOrNotconnectedToAnyAccount(accounts)) {
                this.walletNotFound()
                console.log('Please connect to MetaMask.');
                this.setState({issue:"Please connect to MetaMask." })
            } else if (accounts[0] !== currentAccount) {
                currentAccount = accounts[0];
                console.log(provider.selectedAddress);
                this.setState({account: provider.selectedAddress});
                this.setState({blockchain: provider.networkVersion});
                this.walletFound()
            }
        };
    }

    walletIsLockedOrNotconnectedToAnyAccount(accounts) {
        return accounts.length === 0;
    }

    async loadBlockchainData() {

    }

    render( ) {
        return (
            <div>   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Personal Video Box</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
               <div style={{color:"white"}}> {this.state.account} </div>
            </Navbar>
                {this.alert(this.state.issue)}
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