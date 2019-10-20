/* Component for a Login form */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../config/app.config';
/* Bootstrap Components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* Okta Components */
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
    
export default withAuth(class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            sessionToken: null,
            username: '',
            password: '',
            user: {}
        }

        // Setup new okta client
        this.oktaAuth = new OktaAuth({ url: config.url})

        // Handle form submission
        this.handleSubmit = this.handleSubmit.bind(this);

        this.passwordChange = this.passwordChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
    }

    passwordChange(event){
        this.setState({password: event.target.value});
    }
    
    usernameChange(event){
        this.setState({username: event.target.value});
    }

    handleSubmit(event){
        // Prevent normal form submission
        event.preventDefault();

        console.log('Creds: ' + this.state.username +" | " + this.state.password );

        this.oktaAuth.signIn({
            username: this.state.username,
            password: this.state.password 
        })
       .then(response => {
           this.setState({
               sessionToken: response.sessionToken
          })
           console.log(response.sessionToken);
        }).catch(err => console.log('Error: ', err));
    }

    render(){
        if(this.state.sessionToken){
            this.props.auth.redirect({sessionToken: this.state.sessionToken});
            return null;
            /*
            return <Redirect to={{
                    pathname: "/dashboard",
                    state: { user: this.state.user }
                }}    
            />
            */
        }
        return(
            <div>
                <Form id="loginForm" onSubmit={ this.handleSubmit }>
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="" 
                            onChange={ this.usernameChange }
                        />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder=""
                            onChange={ this.passwordChange }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign In</Button>
                </Form>
            </div>
        );
    }
})
