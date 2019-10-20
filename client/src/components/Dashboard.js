/* Component for a Dashboard view*/
import React, { Component } from 'react';
import '../styles/Dashboard.css';
/* Bootstrap Components */
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
    
/* Okta */
import { withAuth } from '@okta/okta-react';


export default withAuth(class extends Component {
    constructor(props){
        super(props);
        this.state = { authenticated: null };
        
        // Bind auth check
        this.checkAuthentication = this.checkAuthentication.bind(this);
        // Check Authentication 
        this.checkAuthentication();
    }

    async checkAuthentication(){
        const authenticated = await this.props.auth.isAuthenticated();
        if(authenticated !== this.state.authenticated){
            this.setState({ authenticated });
        }
    }

    componentDidUpdate(){
        this.checkAuthentication();
    }

    componentDidMount(){
    }

    render(){
        let welcomeString = "";
        let logoutButton;

        if(this.state.authenticated){
            console.log("user is signed in.");
            logoutButton = <Button 
                                variant="warning"
                                onClick={()=>{this.props.auth.logout()}}
                                size="lg"
                                className="logoutButton"
                            > Logout
                            </Button>;
        }   
        if(this.props.location.state){
            welcomeString += "Welcome, ";
            welcomeString += this.props.location.state.user.firstName;
            welcomeString += "! Thank you for registering.";
        } else {
            welcomeString = "No user created or signed in.";
        } 

        return(
            <div>
                <Container>
                    {logoutButton}
                </Container>

                <Jumbotron>
                    <Container>
                        <h1>Dashboard</h1>
                    </Container>
                </Jumbotron>
                <Container> 
                    <h3>{ welcomeString }</h3>
                </Container>
            </div>
        );
    }
})
