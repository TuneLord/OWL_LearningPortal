import React, { Component } from 'react';
import './mainViewMenuMobile.css';
import '../SplashScreen/splashScreenMenuDesktop.css';


export class MainViewMenuMobile extends Component {

    render() {
        return (
            <section className="mainViewMenuMobile" style={{ left: this.props.menuPosition }}>
                <div onClick={this.props.onClick}><i className="fas fa-times" ></i></div>

                <div className={"splashScreenMenuDesktop__logo"}>
                    <i className="fab fa-earlybirds" />
                    <h1> <span>OWL</span>earning Portal </h1>
                </div>
                <a className="menu-item" href="/mychecklists">Moje checklisty </a>
                <a className="menu-item" href="/myteams"> Moje zespoły </a>
                <a className="menu-item" href="/settings"> Ustawienia </a>
                <a className="menu-item" href="/logout"> Wyloguj </a>
            </section>
        )
    };
};