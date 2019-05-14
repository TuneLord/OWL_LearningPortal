import React, { Component } from "react";
import "./myTeams.css";

export default class MyTeam extends Component {
    state = {
        addMember: {
            isDisable: true,
            value: '',
            error: ''
        },
        changeName: {
            showInput: false,
            isDisable: true,
            value: ''
        }
    }

    componentDidMount() {
        this.setState({
            changeName: {
                ...this.state.changeName,
                value: this.props.data.name
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                addMember: {
                    isDisable: true,
                    value: '',
                    error: ''
                },
                changeName: {
                    showInput: false,
                    isDisable: true,
                    value: this.props.data.name
                }
            });
        }
    }

    onChangeEmail = (e) => {
        let error = '';
        let isDisable = true;

        if (e.target.value.length === 0)
            error = '';
        else if (!(/^\S+@\S+\.\S+$/i.test(e.target.value)))
            error = 'Niewłaściwy format adresu email';
        else isDisable = false;

        this.setState({
            addMember: {
                isDisable,
                value: e.target.value,
                error
            }
        });
    }

    onClickAddMember = async () => {
        try {
            let response = await fetch(`/teams/${this.props.data._id}?add=${this.state.addMember.value}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            this.props.onChange();
        } catch (err) {
            if (err.status === 400) {
                let error = 'Brak w bazie podanego użytkownika lub należy już do teamu';
                this.setState({
                    addMember: {
                        isDisable: true,
                        value: '',
                        error
                    }
                })
            }
        }
    }

    onClickRemoveMember = async (e) => {
        const index = Number(e.target.parentElement.id);
        const id = this.props.data.members[index]._id;
        try {
            let response = await fetch(`/teams/${this.props.data._id}?remove=${id}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            this.props.onChange();
        } catch (err) {
            console.log(err);
        }
    }

    onClickInputName = () => {
        this.setState({
            changeName: {
                ...this.state.changeName,
                showInput: true
            }
        });
    }

    onChangeName = (e) => {
        let isDisable = true;
        if (/^[a-zA-Z\d@$!%*#?&][a-zA-Z\d\s@$!%*#?&]{1,48}[a-zA-Z\d@$!%*#?&]$/.test(e.target.value))
            isDisable = false;
        this.setState({
            changeName: {
                ...this.state.changeName,
                value: e.target.value,
                isDisable
            }
        });
    }

    onClickChangeName = async () => {
        try {
            let response = await fetch(`/teams/${this.props.data._id}?name=${this.state.changeName.value}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'x-auth-token': localStorage.getItem("x-auth-token")
                }
            })
            if (response.status !== 200) throw response;
            this.setState({
                changeName: {
                    ...this.state.changeName,
                    showInput: false,
                    isDisable: true
                }
            });
            this.props.onChange(this.state.changeName.value);
        } catch (err) {
            console.log(err);
        }
    }

    onClickChangeNameCancel = (e) => {
        e.stopPropagation();
        this.setState({
            changeName: {
                showInput: false,
                isDisable: true,
                value: this.props.data.name
            }
        })
    }


    render() {
        return (
            <div id="myteam">
                <div className="change">  
                    { this.props.data.isMentor === true ?
                        <div onClick={this.onClickInputName}>
                            <input type="text" className="editable" value={this.state.changeName.value} onChange={(e) => this.onChangeName(e)} disabled={!this.state.changeName.showInput} />
                        </div>
                        : <div>
                            <input type="text" value={this.state.changeName.value} disabled />
                        </div>
                    }               
                    {this.state.changeName.showInput && 
                        <div className='change-name'>
                            <button onClick={this.onClickChangeName} disabled={this.state.changeName.isDisable}>Zmień</button>
                            <span>|</span>
                            <button onClick={(e) => this.onClickChangeNameCancel(e)} >Anuluj</button> 
                        </div>
                    }
                </div>
                <ul className="myteams-list">
                    {this.props.data.members.map((el, index) =>
                        <li key={index} id={index}><div>
                            {el._id === this.props.data.mentorId ? 
                                <i className="fas fa-chalkboard-teacher icon-member"></i>
                                : <i className="fas fa-user-graduate icon-member"></i>
                            }
                            {el.email}</div>
                            {this.props.data.isMentor && el._id !== this.props.data.mentorId && <i className="material-icons icon-float icon-color" onClick={(e) => this.onClickRemoveMember(e)}>delete_forever</i>}
                        </li>)
                    }
                </ul>
                {this.props.data.isMentor &&
                    (<div className="add">
                        <input type='text' placeholder='wpisz email użytkownika' value={this.state.addMember.value} onChange={this.onChangeEmail}/>
                        {this.state.addMember.error && (<div className='error'>{this.state.addMember.error}</div>)}
                        <div className="width100">
                            <button className="" onClick={this.onClickAddMember} disabled={this.state.addMember.isDisable}>Dodaj</button>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}

