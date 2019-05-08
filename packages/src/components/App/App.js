import React from 'react';
import './App.css';
import Login from '../Login/login';
import SplashScreen from '../SplashScreen/splashScreen';
import MainView from '../MainView/mainView'
// import { MainViewContainer } from '../mainViewContainer/mainViewContainer';

const App = () => {
    return (
        <div className="App">
            {/* <Login /> */}
            {/* <SplashScreen /> */}
            {/* <MainViewContainer /> */}
            <MainView />
        </div>
    );
};

export default App;
