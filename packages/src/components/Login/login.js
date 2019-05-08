import React from 'react';
import './form.css';
import { connect } from 'react-redux';
import { loginStatus } from '../../actions/loginStatus'

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
            this.props.loginStatus(true);
            console.log('Logowanie przebiegło pomyślnie')
        } catch (err) {
            console.log(err);
            if ([404, 400].includes(err.status)) {
                let error = 'Błędny email lub hasło';
                this.setState({
                    email: '',
                    password: '',
                    isDisable: true,
                    errors: {
                        email: error,
                        password: error
                    }
                });
            }
        }
    }

    render() {
        return (
            <div className='form login'>
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

// const mapStateToProps = (state) => {
//     console.log(state);
//     return state;
// }

export default connect(null, { loginStatus })(Login);