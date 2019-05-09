import React from 'react';
import './App.css';
import Login from '../Login/login';
import SplashScreen from '../SplashScreen/splashScreen';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import mainView from '../MainView/mainView';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Login/>
            </div>
            <Route exact path="/" component={SplashScreen} />
            <Route path='/me/:id' component={mainView} />
        </Router>
    );
};

export default App;
