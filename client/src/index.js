import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react'
import config from './config/app.config.js'


function onAuthRequired({ history }) {
  history.push('/login');
}

ReactDOM.render(
    <Router>
        <Security
            issuer={config.issuer}
            client_id={config.clientId}
            redirect_uri={config.redirectUri}
            onAuthRequired={onAuthRequired}
        >
            <App />
        </Security>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
