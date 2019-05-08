import React from 'react';
import './App.css';
import Login from '../Login/login';
import SplashScreen from '../SplashScreen/splashScreen';

const App = () => {
    return (
        <div className="App">
            <Login/>
            <SplashScreen />
        </div>
    );
};

export default App;
