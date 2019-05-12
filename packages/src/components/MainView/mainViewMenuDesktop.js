import React from 'react';
import './mainViewMenuDesktop.css';
import '../SplashScreen/splashScreenMenuDesktop.css';
import  {Link} from 'react-router-dom';

export const MainViewMenuDesktop = ({ id }) => {
    return (
      <section className="mainViewMenuDesktop">
        <div className={"splashScreenMenuDesktop__logo"}>
          <i className="fab fa-earlybirds" />
          <h1>
            <span>OWL</span>earning Portal
          </h1>
        </div>
        <Link className="menu-item" to={`/me/${id}`}>
          Moje checklisty
        </Link>
        <Link className="menu-item" to={`/me/myteams/${id}`}>
          Moje teamy
        </Link>
        <Link className="menu-item" to={`/settings/${id}`}>
          Ustawienia
        </Link>
        <Link className="menu-item" to="/logout">
          Wyloguj
        </Link>
      </section>
    );
}