import React, { Component } from "react";
import "./myChecklists.css";
import TextEditor from '../TextEditor';

export default class MyChecklists extends Component {
  state = {
    data: [{ title: "Pierwsza checklista", author: "Zbyszek", isDone: false }, {
      title: "Druga checklista",
      author: "anonim",
      isDone: false
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
      <section id="mychecklists">
        {/* <div className="mychecklists_content">
            <div className="mychecklists_buttons">
              <button className="countButton">2 Liczba checklist</button>
              <button className="logicButton"> Utwórz checklistę </button>
            </div>
            <div className={'textEditor'}>
              <TextEditor value={null} />
            </div>
        </div> */}
        <div className="mychecklists_container">
          <div className="mychecklists_title">
            <i className="material-icons">
              school
            </i>
            <h3 className="mychecklists_title__header">Moje checklisty</h3>
          </div>
          <ul className="mychecklists_list">
            {this.state.data.map(el =>
              <li className="mychecklists_checklista" key={el.title}>
                {el.title}
                <i className="material-icons icon-float icon-color">link</i>
                <i className="material-icons icon-float icon-color">book</i>
                <div className="mychecklist_author">Autor: {el.author}</div>
              </li>)}
          </ul>
        </div>
      </section>
    );
  }
}

