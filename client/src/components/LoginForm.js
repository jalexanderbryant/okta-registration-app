/* Component for a Login form */
import React, { Component } from 'react';

/* Bootstrap Components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

    
export default class LoginForm extends Component {
    render(){
        return(
            <div>
                <Form id="loginForm">
                    <Form.Group controlId="loginFormEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="" />
                    </Form.Group>

                    <Form.Group controlId="loginFormPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                   
                    <Button variant="primary" type="submit">Sign In</Button>
                </Form>
            </div>

        );
    }
}
