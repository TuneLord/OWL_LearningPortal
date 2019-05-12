import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './mainViewMenuMobile.css';
import '../SplashScreen/splashScreenMenuDesktop.css';


export class MainViewMenuMobile extends Component {

    render() {
        const { id } = this.props;
        return (
            <section className="mainViewMenuMobile" style={{ left: this.props.menuPosition }}>
                <div onClick={this.props.onClick}><i className="fas fa-times" ></i></div>

                <div className={"splashScreenMenuDesktop__logo"}>
                    <i className="fab fa-earlybirds" />
                    <h1> <span>OWL</span>earning Portal </h1>
                </div>
                <Link className="menu-item" to={`/me/${id}`}>Moje checklisty </Link>
                <Link className="menu-item" to={`/me/myteams/${id}`}> Moje zespoły </Link>
                <Link className="menu-item" to={`/settings/${id}`}> Ustawienia </Link>
                <Link className="menu-item" to="/logout"> Wyloguj </Link>
            </section>
        )
    };
};