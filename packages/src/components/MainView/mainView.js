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
        {path === '/me/myteams' ? <MyTeams /> : null}
        {path === `/me` ? <MyChecklists /> :null}
        </div>
      </section>
    );
  }
}
