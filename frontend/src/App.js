import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;