import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component{
    // Home Component
    constructor(props){
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
    }

    async checkAuthentication(){
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated){
            this.setState({ authenticated });
        }
    }

    componentDidUpdate(){
        this.checkAuthentication();
    }


    render(){
        if (this.state.authenticated === null) return null;

        const button = this.state.authenticated ? 
          <button onClick={() => {this.props.auth.logout()}}>Logout</button> :
          <button onClick={() => {this.props.auth.login()}}>Login</button>;

        const profileLink = this.state.authenticated ?
            <Link to='/profile'>Profile</Link> : null 

        const registerLink = !this.state.authenticated ?
            <Link to='/register'>Register</Link> : null 
        
        return(
            <div>
                <Link to='/'>Home</Link><br/>
                <Link to='/contact'>Contact</Link><br />
            </div>
        );
    }

});
