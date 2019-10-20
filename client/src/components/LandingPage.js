/* Landing page component. Displays a custom page used to display a custom 
 * login and registration form. */ 
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/LandingPage.css'; 
/* App Components */
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

/* Bootstrap Components */
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

/* Okta */
import { withAuth } from '@okta/okta-react';

export default withAuth(class LandingPage extends Component {
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
 
    render(){
        if(this.state.authenticated === null) return null;
        if(this.state.authenticated){
           return <Redirect to={{ pathname:'/dashboard' }}/>; 
        }
        return(
            <div className="landingPage">
                    <div id="verticalCenter">
                        <Container className="tabContainer">
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
                        </Container>
                    </div>
            </div>
        );
    }
})
