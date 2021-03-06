import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import './styles/App.css';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import config from './config/app.config';
/*
function onAuthRequired({history}){
    history.push('/login');
}
*/

class App extends Component
{
    state = {
        greeting: "Hi! - Greeting not set from API"
    };

    componentDidMount(){
        console.log('URL: ' + config.url);
    }

    render (){
      return (
          <main>
            <Route path='/' exact={true} component={LandingPage} />
            <Route path='/dashboard' exact={true} component={Dashboard} />
          </main>
      );
    }
}
export default App;
