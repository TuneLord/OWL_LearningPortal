import React from 'react';
import '../Login/form.css';
import './register.css';
import { connect } from 'react-redux';
import { loginStatus } from '../../actions/loginStatus'
import { GoogleLogin } from 'react-google-login';
import SplashScreenMenuMobile from '../SplashScreen/splashScreenMenuMobile';
import SplashScreenMenuDesktop from '../SplashScreen/splashScreenMenuDesktop';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: 'student',
            errors: {},
            isDisable: true
        };
    }

    componentDidMount()
    {
        const token = sessionStorage.getItem("x-auth-token");
        const id = sessionStorage.getItem("id");
        if (id && token) this.props.history.push(`/me/${id}`);
    }
    
    onChangeName = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length === 0)
            error = 'To pole jest wymagane';
        else if (e.target.value.length < 3)
            error = 'Nazwa powinna posiadać min. 3 znaki';
        else if (e.target.value.length > 50)
            error = 'Dozwolona długość nazwy do 50 znaków';
        else if (!(/^[a-zA-Z\d@$!%*#?&][a-zA-Z\d\s@$!%*#?&]+[a-zA-Z\d@$!%*#?&]$/.test(e.target.value)))
            error = 'Nazwa zawiera niedozwolone znaki';
        else isDisable = false;

        this.setState({
            name: e.target.value,
            isDisable,
            errors: {
                ...this.state.errors,
                name: error
            }
        });
    }

    onChangeEmail = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length === 0)
            error = 'To pole jest wymagane';
        else if (!(/^\S+@\S+\.\S+$/i.test(e.target.value)))
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
        else if (e.target.value.length > 50)
            error = 'Dozwolona długość hasła do 50 znaków';
        else if (!(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]+/.test(e.target.value)))
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

    onChangeType = (e) => {
        this.setState({ type: e.target.value });
    }

    onSubmitForm = async(e) => {
        e.preventDefault();

        const requestBody = {};
        requestBody.name =  this.state.name;
        requestBody.email = this.state.email;
        requestBody.password = this.state.password;
        requestBody.type = this.state.type;

        try {
            let response = await fetch('/register', {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            sessionStorage.setItem("x-auth-token", response.headers.get('x-auth-token'));
            this.props.loginStatus(true);
            response = await response.json();
            sessionStorage.setItem("id", response);
            this.props.history.push(`/me/${response}`);
            console.log('Konto zostało utworzone')
        } catch(err) {
            console.log(err);
            if ([404, 400].includes(err.status)) {
                let error = 'Konto o podanym adresie email już istnieje';
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    type: 'student',
                    isDisable: true,
                    errors: {
                        email: error
                    }
                });
            }
        }
    }

    responseGoogle = (res) => {
        const { name, email } = res.profileObj;
        const error = "Wpisz hasło dla standardowego logowania";
        this.setState({
            name: name,
            email: email,
            password: '',
            isDisable: true,
            errors: {
                password: error
            }
        });
    }

    errorGoogle = (err) => {
        console.log(err);
    }

    render() {
        const windowWidth = window.innerWidth;

        return (
            <div>
        {windowWidth < 1025 ?
          <SplashScreenMenuMobile /> :
          <SplashScreenMenuDesktop />
        }
            <div className='form register'>
                <h2>Załóż konto</h2>
                <form onSubmit={this.onSubmitForm}>
                    <div className="form-el">
                        <i className="fas fa-user"></i>
                        <input type='text' value={this.state.name} onChange={this.onChangeName} placeholder='wpisz swoje imię' />
                    </div>
                    {this.state.errors.name && (<div className='error'>{this.state.errors.name}</div>)}
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
                    <div className="form-el">
                        <div>
                            <input id="mentor" type="radio" name="type" value="mentor" onChange={this.onChangeType} checked={this.state.type === 'mentor'} />
                            <label htmlFor="mentor">mentor</label>
                        </div>
                        <div>
                            <input id="student" type="radio" name="type" value="student" onChange={this.onChangeType} checked={this.state.type === 'student'} />
                            <label htmlFor="student">student</label> 
                        </div>
                    </div>   
                    <input id="submit" type='submit' value='Załóż konto' disabled={this.state.isDisable}/>
                    <div className="or"><span>lub</span></div>
                    <GoogleLogin
                        clientId = {process.env.REACT_APP_GCLIENT_ID}
                        render={renderProps => (
                            <button className='gplus' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <i className="fab fa-google"></i>
                                <span>Połącz z kontem Google</span>
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.errorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />                   
                </form>
            </div>
            </div>
        );
    }
}   

// const mapStateToProps = (state)  => {
//     console.log(state);
//     return state;
// }

export default connect(null, { loginStatus })(Register);