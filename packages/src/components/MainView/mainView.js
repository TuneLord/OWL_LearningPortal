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
        <MainViewContainer onClick={() => this.mobileMenuEnter()} />
        {path.endsWith('/myteams') ? <MyTeams /> : null}
        {path.endsWith( '/me') ? <MyChecklists /> :null}
        </div>
      </section>
    );
  };
};
