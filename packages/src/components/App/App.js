import React from 'react';
import './App.css';
import Login from '../Login/login';
import TextEditor from "../TextEditor/texteditor";


const App = () => {
    return (
        <div className="App">
            <Login />
            <TextEditor />
        </div>
    );
}

export default App;
