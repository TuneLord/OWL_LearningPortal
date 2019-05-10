import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import MainViewContainer from '../mainViewContainer/mainViewContainer';

export default class MainView extends Component {
  render() {
    const windowWidth = window.innerWidth;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        <MainViewContainer />
      </section>
    );
  }
}
