import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import { MainViewMenuMobile } from './mainViewMenuMobile';
import MainViewContainer from '../mainViewContainer/mainViewContainer';
import MyTeams from "./myTeams";

export default class MainView extends Component {
  state = {
    menuMobilePosition: '-400px'
  };

  // componentDidMount()
  // {
  //   const token = sessionStorage.getItem("x-auth-token");
  //   if (!token) this.props.history.push("/");
  // }

  mobileMenuEnter() {
    this.setState({ menuMobilePosition: '0px' })
  };

  mobileMenuClose() {
    this.setState({ menuMobilePosition: '-400px' })
  };

  render() {

    const windowWidth = window.innerWidth;
    const path = window.location.pathname;
    const { id } = this.props.match.params;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop id={id} /> : null}
        {windowWidth < 1025 ? <MainViewMenuMobile onClick={() => this.mobileMenuClose()} menuPosition={this.state.menuMobilePosition} /> : null}
        {path.endsWith(`/myteams/${id}`) ? <MyTeams onClick={() => this.mobileMenuEnter()} /> : null}
        {path.endsWith(`/me/${id}`) ? <MainViewContainer onClick={() => this.mobileMenuEnter()} /> : null}
      </section>
    );
  };
};
