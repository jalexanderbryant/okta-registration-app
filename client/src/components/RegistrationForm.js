/* Component for a Login form */
import React, { Component } from 'react';
import config from '../config/app.config';

/* Bootstrap Components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            formData: {}
        }
        
        // Handle form submission
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

        const post =    {
            userId: 1,
            id: 100001,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipitnostrum rerum est autem sunt rem eveniet architecto"
        };


        // Attempt to create a post
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            body: JSON.stringify(post),
            headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            return response.json();
        })
        .then(function(ddd){
            console.log(ddd);
        });


    }




    handleSubmit(event){
        event.preventDefault();

        const userInfo = {
            profile: {
                firstName: event.target.elements.firstName.value,
                lastName: event.target.elements.lastName.value,
                email: event.target.elements.email.value,
                login: event.target.elements.email.value
            },
            credentials:{
                password: { value: event.target.elements.password.value }
            }
        };

        const userInfoStr = JSON.stringify(userInfo);
        console.log(userInfoStr);



        // Attempt to create a user 
        fetch('https://dev-956010.okta.com/api/v1/users?activate=true',{
            method: 'POST',
            body: userInfoStr,
            withCredentials: true,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "SSWS " + config.apiToken 
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(body){
            console.log(body);
        });
    }



    render(){
        return(
            <div>
                <Form id="registrationForm" onSubmit={ this.handleSubmit } >
                    { /* First Name */}
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    
                    { /* Last Name */}
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    
                    { /* Email */}
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>        
                    </Form.Group>
            
                    { /* Password */}
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
                    
                    { /* Confirm Password */}
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="" />
                    </Form.Group>
            
                    <Button variant="primary" type="submit">Sign Up</Button>
                </Form>
            </div>
        );
    }
}
