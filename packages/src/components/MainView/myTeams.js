import React, { Component } from "react";
import "./myTeams.css";
import {MyTeam} from './myTeam';



export default class MyTeams extends Component {
  state = {
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
    return (
      <section id="myteams">
        <div className="myteams_content">
            <div className="myteams_buttons">
              <button className="countButton">2 Liczba teamów</button>
            </div>
            <div className="myteam">
              <MyTeam data={this.state.data[0].coworkers} title={this.state.data[0].title} checklisty={this.state.data[0].checklisty} />
            </div>
        </div>
        <div className="myteams_container">
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