import React from 'react';
import './App.css';
import Login from '../Login/login';
import RTFEditor from "../RTFEditor/rtfeditor"

const App = () => {
    return (
        <div className="App">
            <Login />
            <RTFEditor />
        </div>
    );
}

export default App;
