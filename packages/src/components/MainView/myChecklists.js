import React, { Component } from "react";
import "./myChecklists.css";

export default class MyChecklists extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const requestHeaders = {
      'Content-Type': "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token")
    };
    await fetch(`/user`, {
      method: 'get',
      headers: requestHeaders,
    }).then(resp => resp.json()
      .then(resp => console.log(resp))
      .then(data => this.setState({ data: data })))
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    if (this.props.newChecklist !== prevProps.newChecklist) {
      this.setState({
        data: [...this.state.data, this.props.newChecklist]
      })
    }
  }

  render() {
    return (
      <section id="mychecklists">
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
  };
};