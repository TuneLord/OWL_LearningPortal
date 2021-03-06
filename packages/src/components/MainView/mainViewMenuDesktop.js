import React from 'react';
import './mainViewMenuDesktop.css';
import '../SplashScreen/splashScreenMenuDesktop.css';
import  {Link} from 'react-router-dom';
import ThemeChanger from '../App/ThemeChanger';

export const MainViewMenuDesktop = () => {
    return (
      <section className="mainViewMenuDesktop">
        <div className={"splashScreenMenuDesktop__logo"}>
          <i className="fab fa-earlybirds" />
          <h1>
            <span>OWL</span>earning Portal
          </h1>
        </div>
        <Link className="menu-item" to={`/me`}>
          Moje checklisty
        </Link>
        <Link className="menu-item" to={`/me/myteams`}>
          Moje teamy
        </Link>
        <Link className="menu-item" to={`/settings`}>
          Ustawienia
        </Link>
        <Link className="menu-item" to={window.location}><ThemeChanger /></Link>
        <Link className="menu-item" to="/logout">
          Wyloguj
        </Link>
      </section>
    );
}