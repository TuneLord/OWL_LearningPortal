import React from 'react';
import './form.css';
import { connect } from 'react-redux';
import { loginStatus } from '../../actions/loginStatus';
import { GoogleLogin } from 'react-google-login';
import SplashScreenMenuMobile from '../SplashScreen/splashScreenMenuMobile';
import SplashScreenMenuDesktop from '../SplashScreen/splashScreenMenuDesktop';

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

    componentDidMount() {
        const token = localStorage.getItem("x-auth-token");
        if (token) this.props.history.push(`/me`);
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
    };

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

    onSubmitForm = async (e) => {
        e.preventDefault();

        const requestBody = {};
        requestBody.email = this.state.email;
        requestBody.password = this.state.password;
        try {
            let response = await fetch('/login', {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            localStorage.setItem("x-auth-token", response.headers.get('x-auth-token'));
            response = await response.json();
            this.props.loginStatus(true);
            this.props.history.push(`/me`);
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

    responseGoogle = async (res) => {
        try {
            let response = await fetch('/login?googleAuth=true', {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "x-auth-token-google": res.tokenId
                }
            });
            if (response.status !== 200) throw response;
            localStorage.setItem("x-auth-token", response.headers.get('x-auth-token'));
            response = await response.json();
            this.props.loginStatus(true);
            this.props.history.push(`/me`);
        } catch (err) {
            console.log(err);
            if ([404, 400].includes(err.status)) {
                const error = "Konto nie jest połączone z kontem Google lub usługa chwilowo niedostępna";
                this.setState({
                    email: '',
                    password: '',
                    isDisable: true,
                    errors: {
                        email: error
                    }
                });
            }
        }
    }

    render() {
        const windowWidth = window.innerWidth;

        return (
            <div id='container'>
                {windowWidth < 1025 ?
                    <SplashScreenMenuMobile /> :
                    <SplashScreenMenuDesktop />
                }
                <div className='form login'>
                    <h2>Zaloguj się</h2>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-el">
                            <i className="fas fa-envelope"></i>
                            <input type='email' value={this.state.email} onChange={this.onChangeEmail} placeholder='podaj adres e-mail' />
                        </div>
                        {this.state.errors.email && (<div className='error'>{this.state.errors.email}</div>)}
                        <div className="form-el">
                            <i className="fas fa-lock"></i>
                            <input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder='podaj hasło' />
                        </div>
                        {this.state.errors.password && (<div className='error'>{this.state.errors.password}</div>)}
                        <input id='submit' type='submit' value='Zaloguj się' disabled={this.state.isDisable} />
                        <div className="or"><span>lub</span></div>
                        <GoogleLogin
                            clientId="609136166131-5spsmc9vddptv62kfv0i6uttslesqjfq.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className='gplus' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    <i className="fab fa-google"></i>
                                    <span>Użyj konta Google</span>
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>
                </div>
            </div>
        );
    };
};

export default connect(null, { loginStatus })(Login);