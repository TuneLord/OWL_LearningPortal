import React from "react";
import "./splashScreenContent.css";
import { Link } from "react-router-dom"

export const SplashScreenContent = () => {
  return (
      <section className='splashScreenContent'>
        <div>
          <h1><strong>Nauczanie</strong> w internecie jest proste i skuteczne!</h1>
          <p>Nauczanie w internecie nigdy nie było łatwiejsze. Skomponuj własne materiały i dziel się nimi z kim tylko chcesz.</p>
          <Link className="menu-item" to="/register">Załóż konto</Link>
        </div>
      </section>
  );
};