import React from 'react';
import './login.css';
import { connect } from 'react-redux';

const Login = () => {
    return (
        <div className='login'>

        </div>
    );
};

// Tu zwracamy interesujący nas fragment ze stora (przechowywacza stanów)
const mapStateToProps = (state) => {
    console.log(state);
    return state;
};

// Przyjmuje cały stan i zwraca propsy dla komponentu
export default connect(mapStateToProps)(Login);