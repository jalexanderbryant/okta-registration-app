import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './styles/App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import config from './config/app.config';

/* Okta Components */
import { withAuth } from '@okta/okta-react';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

/*
function onAuthRequired({history}){
    history.push('/login');
}
*/

export default class App extends Component {

    componentDidMount(){
        console.log('URL: ' + config.url);
    }

    render (){
      return (
          <main>
            <Route path={["/", "/login" ]} exact={true} component={LandingPage} />
            <SecureRoute path='/dashboard' component={Dashboard} />
            <Route path='/implicit/callback' component={ImplicitCallback}/>
          </main>
      );
    }
}
