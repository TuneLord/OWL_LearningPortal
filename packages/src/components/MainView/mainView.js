import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import MyChecklists from "./myChecklists";
import MyTeams from "./myTeams";

export default class mainView extends Component {
  render() {
    const windowWidth = window.innerWidth;
    const path = window.location.pathname;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        <div className="mainView__container">
        {path.endsWith('/myteams') ? <MyTeams /> : null}
        {path.endsWith( '/me') ? <MyChecklists /> :null}
        </div>
      </section>
    );
  }
}
