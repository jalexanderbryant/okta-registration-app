/* Component for a Dashboard view*/
import React, { Component } from 'react';
import '../styles/Dashboard.css';
/* Bootstrap Components */
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
    
/* Okta */
import { withAuth } from '@okta/okta-react';


export default withAuth(class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = { 
            authenticated: null,
            userInfo: null
        };
        
        // Bind auth check
        this.checkAuthentication = this.checkAuthentication.bind(this);
        // Check Authentication 
        this.checkAuthentication();

    }

    async checkAuthentication(){
        const authenticated = await this.props.auth.isAuthenticated();
        if(authenticated !== this.state.authenticated){
            this.setState({ authenticated });
            
            // Get user info
            const userInfo = await this.props.auth.getUser();
            this.setState({ userInfo } );
        }
    }

    async componentDidUpdate(){
        this.checkAuthentication();
    }

    async componentDidMount(){
        this.checkAuthentication();
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
        if(this.state.userInfo){
            let cfn = this.state.userInfo.given_name;
            cfn = cfn.charAt(0).toUpperCase() + cfn.slice(1); 
            welcomeString += "Welcome, ";
            welcomeString += cfn; 
            welcomeString += "! Thank you for registering.";
        } else {
            welcomeString = "No user created or signed in.";
        } 
        console.log(this.state.userInfo);
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
