import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";

export default class mainView extends Component {
  render() {
    const windowWidth = window.innerWidth;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        <div className="mainView__container" />
      </section>
    );
  }
}
