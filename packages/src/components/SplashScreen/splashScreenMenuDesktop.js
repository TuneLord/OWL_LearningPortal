import React, { Component } from "react";
import "./splashScreenMenuDesktop.css";

export default class SplashScreenMenuDesktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'splashScreenMenuDesktop'}>
        <div className={'splashScreenMenuDesktop__logo'}>
          <i className="fab fa-earlybirds"/>
          <h1><span>OWL</span>earning Portal</h1>
        </div>
        <div className={'splashScreenMenuDesktop__menu'}>
          <a className="menu-item" href="/howtouse">Jak używać aplikacji?</a>
          <a className="menu-item" href="/faq">Pytania i odpowiedzi</a>
          <a className="menu-item" href="/contact">Kontakt</a>
          <a className="menu-item" href="/login">Zaloguj się</a>
          <a className="menu-item" href="/register">Załóż konto</a>
        </div>
      </section>
    );
  }
}