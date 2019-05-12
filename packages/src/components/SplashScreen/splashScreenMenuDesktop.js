import React, { Component } from "react";
import "./splashScreenMenuDesktop.css";
import { Link } from "react-router-dom";

export default class SplashScreenMenuDesktop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={'splashScreenMenuDesktop'}>
        <Link to="/" className={'splashScreenMenuDesktop__logo'}>
          <i className="fab fa-earlybirds"/>
          <h1><span>OWL</span>earning Portal</h1>
        </Link>
        <div className={'splashScreenMenuDesktop__menu'}>
          <Link className="menu-item" to="/howtouse">Jak używać aplikacji?</Link>
          <Link className="menu-item" to="/faq">Pytania i odpowiedzi</Link>
          <Link className="menu-item" to="/contact">Kontakt</Link>
          <Link className="menu-item" to="/login">Zaloguj się</Link>
          <Link className="menu-item" to="/register">Załóż konto</Link>
        </div>
      </section>
    );
  }
}