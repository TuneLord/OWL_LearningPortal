import React from 'react';
import './App.css';
import Login from '../Login/login';
import SplashScreen from '../SplashScreen/splashScreen';
import { MainViewContainer } from '../mainViewContainer/mainViewContainer';

// import mainViewContainer from '..mainViewContainer';

const App = () => {
    return (
        <div className="App">
            {/* <Login /> */}
            {/* <SplashScreen /> */}
            <MainViewContainer />
        </div>
    );
};

export default App;
