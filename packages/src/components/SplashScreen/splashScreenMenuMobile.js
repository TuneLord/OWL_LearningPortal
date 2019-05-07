import React, { Component } from "react";
import "./splashScreenMenuMobile.css";
import { slide as Menu } from 'react-burger-menu';

export default class SplashScreenMenuMobile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'splashScreenMenuMobile'}>
        <div className={'splashScreenMenuMobile__logo'}>
          <i className="fab fa-earlybirds" />
          <h1><span>OWL</span>earning Portal</h1>
        </div>
        <Menu right width={'60vw'} noOverlay disableOverlayClick>
          <a className="menu-item" href="/"><i className="fab fa-earlybirds" /></a>
          <a className="menu-item" href="/howtouse">Jak używać aplikacji?</a>
          <a className="menu-item" href="/faq">Pytania i odpowiedzi</a>
          <a className="menu-item" href="/contact">Kontakt</a>
          <a className="menu-item" href="/login">Zaloguj się</a>
          <a className="menu-item" href="/register">Załóż konto</a>
        </Menu>
      </section>
    );
  }
}