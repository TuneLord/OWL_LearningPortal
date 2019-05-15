import React from "react";
import SplashScreenMenuMobile from "../SplashScreen/splashScreenMenuMobile";
import SplashScreenMenuDesktop from "../SplashScreen/splashScreenMenuDesktop";
import { Link } from "react-router-dom";

export default class Logout extends React.Component {
    componentDidMount()
    {
        localStorage.removeItem("id");
        localStorage.removeItem("x-auth-token");
    }
	render() {
		const windowWidth = window.innerWidth;

		return (
			<section className={"splashScreen"}>
				{windowWidth < 1025 ? (
					<SplashScreenMenuMobile />
				) : (
					<SplashScreenMenuDesktop />
				)}
				<section className="splashScreenContent">
					<div>
						<h1>
							Pomyślnie wylogowano
						</h1>
						<Link className="menu-item" to="/">
							Wróć do strony głownej
						</Link>
					</div>
				</section>
			</section>
		);
	}
}
