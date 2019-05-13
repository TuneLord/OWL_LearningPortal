import React, { Component } from "react";
import "./splashScreenMenuMobile.css";
import { slide as Menu } from 'react-burger-menu';
import ThemeChanger from "../App/ThemeChanger";
import { Link } from "react-router-dom";

export default class SplashScreenMenuMobile extends Component {

  render() {
    return (
      <section className={'splashScreenMenuMobile'}>
        <div className={'splashScreenMenuMobile__logo'}>
          <i className="fab fa-earlybirds" />
          <h1><span>OWL</span>earning Portal</h1>
        </div>
        <Menu right width={'60vw'} noOverlay disableOverlayClick>
          <Link className="menu-item" to="/"><i className="fab fa-earlybirds" /></Link>
          <Link className="menu-item" to="/howtouse">Jak używać aplikacji?</Link>
          <Link className="menu-item" to="/faq">Pytania i odpowiedzi</Link>
          <Link className="menu-item" to="/contact">Kontakt</Link>
          <Link className="menu-item" to="/"><ThemeChanger /></Link>
          <Link className="menu-item" to="/login">Zaloguj się</Link>
          <Link className="menu-item" to="/register">Załóż konto</Link>
        </Menu>
      </section>
    );
  }
}