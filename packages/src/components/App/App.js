import React from 'react';
import './App.css';
// import Login from '../Login/login';
import SplashScreen from '../SplashScreen/splashScreen';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import MainView from '../MainView/mainView';


const App = () => {
    return (
        <Router>
            <div className="App">
                {/* <Login/>
                <MainView /> */}
            </div>
            <Route exact path="/" component={SplashScreen} />
            <Route path='/:id/me' component={MainView} />
        </Router>
    );
};

export default App;
