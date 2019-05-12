import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import { MainViewMenuMobile } from './mainViewMenuMobile';
import MainViewContainer from '../mainViewContainer/mainViewContainer';
import MyChecklists from "./myChecklists";
import MyTeams from "./myTeams";

export default class MainView extends Component {
  state = {
    menuMobilePosition: '-400px'
  };
  mobileMenuEnter() {
    this.setState({ menuMobilePosition: '0px' })
  };

  mobileMenuClose() {
    this.setState({ menuMobilePosition: '-400px' })
  };

  render() {
    const windowWidth = window.innerWidth;
    const path = window.location.pathname;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        {windowWidth < 1025 ? <MainViewMenuMobile onClick={() => this.mobileMenuClose()} menuPosition={this.state.menuMobilePosition} /> : null}
        {path.endsWith('/myteams') ? <MyTeams onClick={() => this.mobileMenuEnter()} /> : null}
        {path.endsWith('/me') ? <MainViewContainer onClick={() => this.mobileMenuEnter()} /> : null}
      </section>
    );
  };
};
