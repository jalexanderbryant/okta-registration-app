/* Component for a Login form */
import React, { Component } from 'react';

/* Bootstrap Components */
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
    
export default class LoginForm extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        let welcomeString = ""
        if(this.props.location.state){
            welcomeString += "Welcome, ";
            welcomeString += this.props.location.state.user.firstName;
            welcomeString += "! Thank you for registering.";
        } else {
            welcomeString = "No user created or signed in.";
        } 

        return(
            <div>
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
}

