import React from 'react';
import './App.css';
import Login from '../Login/login';
import Logout from "../Logout"
import Register from "../Register/register"
import SplashScreen from '../SplashScreen/splashScreen';
import Error404 from "../Error404"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import MainView from '../MainView/mainView';


const App = () => {
    return (
        <Router>
            <Switch className="App">
                <Route path="/me/myteams/:id" component={MainView} />
                <Route path='/me/:id' component={MainView} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={SplashScreen} />
                <Route path="/" component={Error404} />
            </Switch>
        </Router>
    );
};

export default App;
