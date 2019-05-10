import React from 'react';
import './mainViewMenuDesktop.css';
import '../SplashScreen/splashScreenMenuDesktop.css';

export const MainViewMenuDesktop = () => {
    return (
      <section className="mainViewMenuDesktop">
        <div className={"splashScreenMenuDesktop__logo"}>
          <i className="fab fa-earlybirds" />
          <h1>
            <span>OWL</span>earning Portal
          </h1>
        </div>
        <a className="menu-item" href="/me">
          Moje checklisty
        </a>
        <a className="menu-item" href="/me/myteams">
          Moje zespoły
        </a>
        <a className="menu-item" href="/settings">
          Ustawienia
        </a>
        <a className="menu-item" href="/logout">
          Wyloguj
        </a>
      </section>
    );
}