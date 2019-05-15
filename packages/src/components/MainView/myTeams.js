import React, { Component } from "react";
import "./myTeams.css";
import MyTeam from './myTeam';
import { Loader } from '../Loader/loader.js';

export default class MyTeams extends Component {
    state = {
        _id: null,
        type: 'użytkownik',
        teams: [],
        checkLists: [],
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
                    'x-auth-token': localStorage.getItem("x-auth-token")
                },
            });
            response = await response.json();
        
            this.setState({
                _id: response._id,
                type: response.type,
                teams: response.teams,
                checkLists: response.checkLists,
                teamsNumber: response.teams.length
            })
        } catch (err) {
            console.log(err)
        }
        if (this.state.teamsNumber > 0) this.showTeam(0);
    }

    async showTeam(index) {
        const id = this.state.teams[index].teamId;
        try {
            let response = await fetch(`/teams/${id}`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({
                teamShowedData: {
                    ...response,
                    isOwner: (response.mentorId === this.state._id ? true : false)
                },
                teamShowed: index
            })
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
        else if (!(/^[\S].+[\S]$/.test(e.target.value)))
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
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({
                teams: [...this.state.teams, response],
                addTeam: {
                    isDidable: true,
                    value: '',
                    error: '',
                    showInput: false
                },
                teamsNumber: ++this.state.teamsNumber
            })
            this.showTeam(this.state.teams.length - 1);
        } catch (err) {
            console.log(err)
        }
    }

    onClickRemoveTeam = async (e) => {
        const index = Number(e.target.parentElement.id);
        const id = this.state.teams[index].teamId;
        try {
            let response = await fetch(`/teams/${id}`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;

            this.setState({
                teams: this.state.teams.filter((el, i) => i !== index),
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
                teams: this.state.teams.map((el, index) => {
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

    onClickShareList = async () => {
        const id = document.getElementById('share').value;
        try {
            let response = await fetch(`/share/team/${id}`, {
                method: 'put',
                body: JSON.stringify(this.state.teamShowedData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;           
            this.showTeam(this.state.teamShowed);

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const windowWidth = window.innerWidth;
        return (
            <div id="myteams">
                {this.state._id === null ?
                    <Loader /> :
                    <section className="container">
                        <div className="header">
                            <h2>Panel {this.state.type}a</h2>
                            {windowWidth <= 1024 ? <div className="menu-burger" onClick={this.props.onClick}><i className="fas fa-bars"></i></div> : null}
                        </div>
                        <div className="state-container">
                            <button className="state-button team">
                                <span>{this.state.teamsNumber}</span>
                                liczba temów
                            </button>
                            <button className="state-button add-team-button" onClick={this.onClickShowInput}>Utwórz nowy team</button>
                        </div>
                        <div>
                            <div className="teams-content">
                                <div className="myteams-title">
                                   <i className="fas fa-campground"></i>
                                    <h3 className="myteams-title-header">Moje teamy</h3>
                                </div>
                                <ul className="">
                                    <div className = "myteams-list">
                                    {this.state.teams.map((el, index) =>
                                        <li className={index === this.state.teamShowed ? 'active' : ''} key={index} id={index} onClick={e => this.onClickShowTeam(e)}>
                                            {el.name}
                                            {el.isOwner && <i className="material-icons icon-float icon-color" onClick={(e) => this.onClickRemoveTeam(e)}>delete_forever</i>}
                                        </li>)
                                    }</div>
                                    {this.state.addTeam.showInput && 
                                        <div className="add">
                                            <input type='text' placeholder='wpisz nazwę teamu' value={this.state.addTeam.value} onChange={this.onChangeName} />
                                            {this.state.addTeam.error && (<div className='error'>{this.state.addTeam.error}</div>)}
                                            <div>
                                                <button className="" onClick={this.onClickAddTeam} disabled={this.state.addTeam.isDisable}>Dodaj</button>
                                                <button className="" onClick={this.onClickAddTeamCancel}>Anuluj</button>
                                            </div>
                                        </div>
                                    }
                                </ul>
                            </div>
                            {this.state.checkLists.length > 0 && this.state.teamShowed !== null && this.state.teams[this.state.teamShowed].isOwner === true &&
                            <div className="checklists-content">
                                <div className="myteams-title">
                                    <i className="fas fa-tasks"></i>
                                    <h3 className="myteams-title-header">Przypisane checklisty</h3>
                                </div>
                                <ul className="">
                                    <div className = "myteams-list">
                                    {!!this.state.teamShowedData.checkLists && this.state.teamShowedData.checkLists.map((el, index) =>
                                        <li key={index} id={el.listId}>
                                            {el.name}
                                        </li>)
                                    }
                                    </div>
                                        <div className="add">
                                            <select id="share" name="nazwa">
                                                {this.state.checkLists.map((el, index) => 
                                                    <option key={index} value={el.listId}>{el.name}</option>
                                                )}
                                            </select>                                       
                                        <div>
                                            <button className="" onClick={this.onClickShareList}>Przypisz</button>
                                        </div>
                                    </div>                            
                                </ul>
                            </div>
                            }
                        </div>
                        <div className="team-content">
                            <div className="myteams-title">
                                <i className="material-icons">people</i>
                                <h3 className="myteams-title-header">Członkowie</h3>
                            </div>
                            {this.state.teamShowed !== null && 
                                <MyTeam team={this.state.teamShowedData} onChange={this.onChangeMyTeam}/>
                            }
                        </div>
                    </section>
                }
            </div>
        );
    }
}