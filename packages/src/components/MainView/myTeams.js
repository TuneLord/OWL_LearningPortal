import React, { Component } from "react";
import "./myTeams.css";
import MyTeam from './myTeam';
import { Loader } from '../Loader/loader.js';

export default class MyTeams extends Component {
    state = {
        _id: null,
        type: 'użytkownik',
        data: [],
        checklists: [],
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
            let resUser = await fetch(`/user`, {
                method: 'get',
                headers: {
                    'Content-Type': "application/json",
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                },
            })
            resUser = await resUser.json()

            let resChecklists = await fetch('/user/checklist', {
                method: 'get',
                headers: {
                    'Content-Type': "application/json",
                    'x-auth-token': sessionStorage.getItem("x-auth-token")
                },
            })
            resChecklists = await resChecklists.json();

            this.setState({
                _id: resUser._id,
                type: resUser.type,
                data: resUser.teams,
                checklists: resChecklists,
                teamsNumber: resUser.teams.length
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
                                   <i class="fas fa-campground"></i>
                                    <h3 className="myteams-title-header">Moje teamy</h3>
                                </div>
                                <ul className="">
                                    <div className = "myteams-list">
                                    {this.state.data.map((el, index) =>
                                        <li className={index === this.state.teamShowed ? 'active' : ''} key={index} id={index} onClick={e => this.onClickShowTeam(e)}>
                                            {el.name}
                                            {this.state._id === el.mentorId  && <i className="material-icons icon-float icon-color" onClick={(e) => this.onClickRemoveTeam(e)}>delete_forever</i>}
                                        </li>)
                                    }</div>
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

                            <div className="checklists-content">
                            <div className="myteams-title">
                                <i class="fas fa-tasks"></i>
                                <h3 className="myteams-title-header">Przypisane checklisty</h3>
                            </div>
                            <ul className="">
                                <div className = "myteams-list">
                                </div>
                                    <div className="add">

                                        <select name="nazwa">
                                            <option selected>Tu wpisz pierwszą możliwość</option>
                                            <option>Tu wpisz drugą możliwość</option>
                                        </select>                                       
                                        <div>
                                            <button className="" onClick={this.onClickAddTeam} disabled={this.state.addTeam.isDisable}>Przypisz</button>
                                        </div>
                                    </div>                            
                            </ul>
                        </div>

                        </div>
                        
                        <div className="team-content">
                            <div className="myteams-title">
                                <i className="material-icons">people</i>
                                <h3 className="myteams-title-header">Członkowie</h3>
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