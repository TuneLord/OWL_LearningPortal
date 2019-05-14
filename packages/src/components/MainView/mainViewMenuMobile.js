import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './mainViewMenuMobile.css';
import '../SplashScreen/splashScreenMenuDesktop.css';
import ThemeChanger from '../App/ThemeChanger';


export class MainViewMenuMobile extends Component {

    render() {
        return (
            <section className="mainViewMenuMobile" style={{ left: this.props.menuPosition }}>
                <div className="cancel" onClick={this.props.onClick}><i className="fas fa-times" ></i></div>

                <div className={"splashScreenMenuDesktop__logo"}>
                    <i className="fab fa-earlybirds" />
                    <h1> <span>OWL</span>earning Portal </h1>
                </div>
                <Link className="menu-item" to={`/me`}>Moje checklisty </Link>
                <Link className="menu-item" to={`/me/myteams`}> Moje zespoły </Link>
                <Link className="menu-item" to={`/settings`}> Ustawienia </Link>
                 <Link className="menu-item" to={window.location}><ThemeChanger /></Link>
                <Link className="menu-item" to="/logout"> Wyloguj </Link>
            </section>
        )
    };
};