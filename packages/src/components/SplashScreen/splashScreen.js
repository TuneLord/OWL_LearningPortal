import React, { Component } from "react";
import "./splashScreen.css";

import SplashScreenMenuMobile from './splashScreenMenuMobile';
import SplashScreenMenuDesktop from './splashScreenMenuDesktop';
import { SplashScreenContent } from "./splashScreenContent";

export default class SplashScreen extends Component {
  state = {
    windowWidth: window.innerWidth
  }
  componentDidMount()
  {
    const token = localStorage.getItem("x-auth-token");
    if (token) this.props.history.push(`/me`);
    window.addEventListener("resize", () => {
      this.setState({
        windowWidth: window.innerWidth
      })
    });
  }

  render() {
    return (
      <section className={'splashScreen'}>
        {this.state.windowWidth <= 1024 ?
          <SplashScreenMenuMobile /> :
          <SplashScreenMenuDesktop />
        }
        <SplashScreenContent />
      </section>
    );
  }
}