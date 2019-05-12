import React from "react"
import SplashScreenMenuMobile from '../SplashScreen/splashScreenMenuMobile';
import SplashScreenMenuDesktop from '../SplashScreen/splashScreenMenuDesktop';


export default class Error404 extends React.Component
{
    render()
    {
        const windowWidth = window.innerWidth;

        return (
        <section className={'splashScreen'}>
            {windowWidth < 1025 ?
            <SplashScreenMenuMobile /> :
            <SplashScreenMenuDesktop />
            }
            <span> PIZDA!!!. Błąd 404 chujku. </span>
        </section>
        );
    }
}