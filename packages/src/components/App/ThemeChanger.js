import React, { Component } from 'react';

export default class ThemeChanger extends Component {
    state = {
        theme: localStorage.getItem("theme"),
    };


    toggleTheme = () => {
        const theme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setState({ theme });
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    render() {
        return <span onClick={() => this.toggleTheme()}>
            Zmień motyw
    </span>
    };
}
