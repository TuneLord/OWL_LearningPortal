import React, { Component } from "react";
import "./splashScreen.css";

import SplashScreenMenuMobile from './splashScreenMenuMobile';
import SplashScreenMenuDesktop from './splashScreenMenuDesktop';
import { SplashScreenContent } from "./splashScreenContent";

export default class SplashScreen extends Component {
  componentDidMount()
  {
    const token = sessionStorage.getItem("x-auth-token");
    if (token) this.props.history.push(`/me`);
  }

  render() {
    const windowWidth = window.innerWidth;

    return (
      <section className={'splashScreen'}>
        {windowWidth < 1025 ?
          <SplashScreenMenuMobile /> :
          <SplashScreenMenuDesktop />
        }
        <SplashScreenContent />
      </section>
    );
  }
}