import React from "react";
import "./App.css";
import Login from "../Login/login";
import Logout from "../Logout";
import Register from "../Register/register";
import SplashScreen from "../SplashScreen/splashScreen";
import Error404 from "../Error404";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainView from "../MainView/mainView";

const Routes = (
	<Switch className="App">
		<Route path="/me/myteams" component={MainView} />
		<Route path="/me" component={MainView} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/logout" component={Logout} />
		<Route exact path="/" component={SplashScreen} />
		<Route path="/" component={Error404} />
	</Switch>
);

const App = () => {
	const theme = localStorage.getItem("theme");
	if (theme) document.documentElement.setAttribute("data-theme", theme);
	return <Router>{Routes}</Router>;
};

export default App;
