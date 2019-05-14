import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import { MainViewMenuMobile } from './mainViewMenuMobile';
import MainViewContainer from '../mainViewContainer/mainViewContainer';
import MyTeams from "./myTeams";

export default class MainView extends Component {
  state = {
    menuMobilePosition: `-${window.innerWidth}px`
  };

  mobileMenuEnter() {
    this.setState({ menuMobilePosition: '0px' })
  };

  mobileMenuClose() {
    this.setState({ menuMobilePosition: `-${window.innerWidth}px` })
  };

  componentDidMount = () => {
    window.addEventListener("resize", () => {
      this.setState({
        menuMobilePosition: `-${window.innerWidth}px`
      })
    });
  }

  render() {
    const windowWidth = window.innerWidth;
    const path = window.location.pathname;

    return (
      <section className="mainView">
        {windowWidth > 1024 ? <MainViewMenuDesktop /> : null}
        {windowWidth <= 1024 ? <MainViewMenuMobile onClick={() => this.mobileMenuClose()} menuPosition={this.state.menuMobilePosition} /> : null}
        {path.endsWith(`/myteams`) ? <MyTeams onClick={() => this.mobileMenuEnter()} /> : null}
        {path.endsWith(`/me`) ? <MainViewContainer onClick={() => this.mobileMenuEnter()} /> : null}
      </section>
    );
  };
};
