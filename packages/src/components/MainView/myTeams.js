import React, { Component } from "react";
import "./myTeams.css";
import MyTeam from './myTeam';
import { Loader } from '../Loader/loader.js';

export default class MyTeams extends Component {
    state = {
        _id: null,
        type: 'użytkownik',
        data: [],
        teamsNumber: 0,
        teamShowed: null,
        teamShowedData: {},
        addTeam: {
            showInput: false,
            isDidable: true,
            value: '',
            error: ''
        }
    };

    async componentDidMount() {
        try {
            let response = await fetch(`/user`, {
                method: 'get',
                headers: {
                    'Content-Type': "application/json",
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                },
            })
            response = await response.json()
            this.setState({
                _id: response._id,
                type: response.type,
                data: response.teams,
                teamsNumber: response.teams.length
            })
            console.log(this.state)
        } catch (err) {
            console.log(err)
        }
        if (this.state.teamsNumber > 0) this.showTeam(0);
    }

    async showTeam(index) {
        const id = this.state.data[index]._id;
        try {
            let response = await fetch(`/teams/${id}`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({
                teamShowedData: {
                    ...response,
                    isMentor: (response.mentorId === this.state._id ? true : false)
                },
                teamShowed: index
            })
            console.log(this.state)
        } catch (err) {
            console.log(err)
        }
    }

    onClickShowTeam = async (e) => {
        const index = Number(e.target.id);
        this.showTeam(index);
    }

    onClickShowInput = () => {
        this.setState({
            addTeam: {
                ...this.state.addTeam,
                showInput: true
            }
        })
    }

    onClickAddTeamCancel = () => {
        this.setState({
            addTeam: {
                isDidable: true,
                value: '',
                error: '',
                showInput: false
            }
        })
    }

    onChangeName = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length < 3)
            error = 'Nazwa powinna posiadać min. 3 znaki';
        else if (e.target.value.length > 50)
            error = 'Dozwolona długość nazwy do 50 znaków';
        else if (!(/^[a-zA-Z\d@$!%*#?&][a-zA-Z\d\s@$!%*#?&]+[a-zA-Z\d@$!%*#?&]$/.test(e.target.value)))
            error = 'Nazwa zawiera niedozwolone znaki';
        else isDisable = false;

        this.setState({
            addTeam: {
                ...this.state.addTeam,
                value: e.target.value,
                error,
                isDisable
            }
        });
    }

    onClickAddTeam = async () => {
        try {
            let response = await fetch('/teams', {
                method: 'post',
                body: JSON.stringify({
                    name: this.state.addTeam.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({
                data: [...this.state.data, response],
                addTeam: {
                    isDidable: true,
                    value: '',
                    error: '',
                    showInput: false
                },
                teamsNumber: ++this.state.teamsNumber
            })
            this.showTeam(this.state.data.length - 1);
        } catch (err) {
            console.log(err)
        }
    }

    onClickRemoveTeam = async (e) => {
        const index = Number(e.target.parentElement.id);
        const id = this.state.data[index]._id;
        try {
            let response = await fetch(`/teams/${id}`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;

            this.setState({
                data: this.state.data.filter((el, i) => i !== index),
                teamsNumber: --this.state.teamsNumber,
                teamShowed: (--this.state.teamsNumber > 0 ? this.state.teamShowed : null)
            })

            if (this.state.teamShowed === index) this.showTeam(0);

        } catch (err) {
            console.log(err)
        }
    }

    onChangeMyTeam = (name) => {
        if (name) {
            this.setState({
                data: this.state.data.map((el, index) => {
                    return (index === this.state.teamShowed) ? {
                        ...el,
                        name
                    } : el
                })
            })
        } else {
            this.showTeam(this.state.teamShowed);
        }
    }

    render() {
        const windowWidth = window.innerWidth;
        return ( 
            <div id="myteams">
                {this.state._id === null ? 
                    <Loader /> :
                    <section className = "container">
                        <div className="header">
                            {windowWidth < 1025 ? <div onClick={this.props.onClick}><i className="fas fa-bars"></i></div> : null}
                            <h2>Panel {this.state.type}a</h2>
                        </div>
                        <div className="state-container">
                            <button className="state-button team">
                                <span>{this.state.teamsNumber}</span>
                                Liczba zespołów
                            </button>
                            <button className="state-button add-team-button" onClick={this.onClickShowInput}>Utwórz nowy team</button>
                        </div>
                        <div className="teams-content">
                            <div className="myteams-title">
                                <i className="material-icons">people</i>
                                <h3 className="myteams-title-header">Moje teamy</h3>
                            </div>
                            <ul className="myteams-list">
                                {this.state.data.map((el, index) =>
                                    <li key={index} id={index} onClick={e => this.onClickShowTeam(e)}>
                                        {el.name}
                                        {this.state._id === el.mentorId  && <i className="material-icons icon-float icon-color" onClick={(e) => this.onClickRemoveTeam(e)}>delete_forever</i>}
                                    </li>)
                                }
                                {this.state.addTeam.showInput && 
                                    <div className="add">
                                        <input type='text' placeholder='wpisz nazwę teamu' value={this.state.addTeam.value} onChange={this.onChangeName}/>
                                        {this.state.addTeam.error && (<div className='error'>{this.state.addTeam.error}</div>)}
                                        <div>
                                            <button className="" onClick={this.onClickAddTeam} disabled={this.state.addTeam.isDisable}>Dodaj</button>
                                            <button className="" onClick={this.onClickAddTeamCancel}>Anuluj</button>
                                        </div>
                                    </div> 
                                }
                            </ul>
                        </div>
                        <div className="team-content">
                            <div className="myteams-title">
                                <i className="material-icons">people</i>
                                <h3 className="myteams-title-header">Mój team</h3>
                            </div>
                            {this.state.teamShowed !== null && 
                                <MyTeam data={this.state.teamShowedData} onChange={this.onChangeMyTeam}/>
                            }
                        </div>
                    </section>
                }
            </div>
        );
    }
}