import React from 'react';
import './login.css';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isDisable: true
        };
    }
    
    onChangeEmail = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length === 0)
            error = 'To pole jest wymagane';
        else if (!(/.+@.+\..+/i.test(e.target.value)))
            error = 'Niewłaściwy format adresu email';
        else isDisable = false;

        this.setState({
            email: e.target.value,
            isDisable,
            errors: {
                ...this.state.errors,
                email: error
            }
        });
    }

    onChangePassword = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length === 0)
            error = 'To pole jest wymagane';
        else if (!(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,}/.test(e.target.value)))
            error = 'Hasło musi składać się przynajmniej z jednej cyfry, jednej dużej i jednej małej litery oraz posiadać min. 6 znaków';
        else isDisable = false;
        this.setState({
            password: e.target.value,
            isDisable,
            errors: {
                ...this.state.errors,
                password: error
            }
        });
    }

    onSubmitForm = async(e) => {
        e.preventDefault();

        const requestBody = {};
        requestBody.email = this.state.email;
        requestBody.password = this.state.password;
        try {
            const response = await fetch('/login', {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            sessionStorage.setItem("x-auth-token", response.headers.get('x-auth-token'));
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className='login'>
                <h2>Zaloguj się</h2>
                <form onSubmit={this.onSubmitForm}>
                    <div>
                        <i className="fas fa-envelope"></i>
                        <input type='email' value={this.state.email} onChange={this.onChangeEmail} placeholder='podaj adres e-mail' />                       
                    </div>
                    {this.state.errors.email && (<div className='error'>{this.state.errors.email}</div>)}
                    <div>
                        <i className="fas fa-lock"></i>
                        <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder='podaj hasło' /> 
                    </div>
                    {this.state.errors.password && (<div className='error'>{this.state.errors.password}</div>)}   
                    <input id='submit' type='submit' value='Zaloguj się' disabled={this.state.isDisable}/>
                </form>
            </div>
        );
    }
}   

// Tu zwracamy interesujący nas fragment ze stora (przechowywacza stanów)
const mapStateToProps = (state) => {
    console.log(state);
    return state;
}

// Przyjmuje cały stan i zwraca propsy dla komponentu
export default connect(mapStateToProps)(Login);