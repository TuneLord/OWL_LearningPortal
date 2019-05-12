import React, { Component } from "react";
import "./myTeams.css";
import '../mainViewContainer/mainViewContainer.css';
import '../mainViewContainer/checklistCounter.css';
import '../mainViewContainer/checklistEditorContainer.css';
import { MyTeam } from './myTeam';

export default class MyTeams extends Component {
  state = {
    teamsNumber: 2,
    data: [{ title: "Mój zespół 1", coworkers: ['kumpel@wp.pl', 'mail.@mail.pl', 'mail.@mail.pl', 'mail.@mail.pl', 'mail.@mail.pl', 'mail.@mail.pl'], checklisty: ['Fajna checklista'] },
    {
      title: "Mój zespół 2",
      coworkers: []
    }
    ]
  };

  // componentDidMount {
  //     fetch(....., {
  //         method: 'GET',
  //          headers: {
  //             "x-log-token": localStorage.getItem("token"),
  //         },
  //     }).then(resp => resp.json()
  //     .then(data => setState({data: data})))
  //     .catch(err => console.log(err))
  // }
  render() {
    const windowWidth = window.innerWidth;

    return (
      <section className="mainView__container">
        <div className="mainView__header">
          {windowWidth < 1025 ? <div onClick={this.props.onClick}><i className="fas fa-bars"></i></div> : null}
          <h2>Panel mentora</h2>
        </div>
        <div className="stateContainter ">
          <button className="state checklistCounter"><span className="checklistNumber">{this.state.teamsNumber}</span>
            <p>Liczba zespołów</p></button>
        </div>
        <div className="myteam">
          <MyTeam data={this.state.data[0].coworkers} title={this.state.data[0].title} checklisty={this.state.data[0].checklisty} />
        </div>

        <div className="checklistEditor__container">
          <div className="myteams_title">
            <i className="material-icons">
              people
            </i>
            <h3 className="myteams_title__header">Moje teamy</h3>
          </div>
          <ul className="myteams_list">
            {this.state.data.map(el =>
              <li className="myteams_team" key={el.title}>
                {el.title}
                <i className="material-icons icon-float icon-color">delete_forever</i>
              </li>)}
          </ul>
        </div>
      </section>
    );
  }
}