import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import { MainViewMenuMobile } from './mainViewMenuMobile';
import MainViewContainer from '../mainViewContainer/mainViewContainer';

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

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        {windowWidth < 1025 ? <MainViewMenuMobile onClick={() => this.mobileMenuClose()} menuPosition={this.state.menuMobilePosition} /> : null}
        <MainViewContainer onClick={() => this.mobileMenuEnter()} />
      </section>
    );
  };
};
