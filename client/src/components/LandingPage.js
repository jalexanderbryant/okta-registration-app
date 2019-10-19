/* Landing page component. Displays a custom page used to display a custom 
 * login and registration form. */ 
import React, { Component } from 'react';

/* App Components */
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

/* Bootstrap Components */
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


/* Styles */
import '../styles/Tabs.css'

export default class LandingPage extends Component {
    render(){
        return(
            <Container>
                <h1 className="text-center">Landing Page</h1>
                <div id="tabContainer"> 
                    <Tabs defaultActiveKey="login" id="tabContainer">
                        {/* Login Tab */}
                        <Tab eventKey="login" title="Login">
                            <LoginForm />
                        </Tab> 
                        
                        {/* Registration Tab */}
                        <Tab eventKey="registration" title="Register">
                            <RegistrationForm />
                        </Tab> 
                    </Tabs>
                </div>
            </Container>
        );
    }
}
