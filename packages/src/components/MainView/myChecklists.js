import React, { Component } from "react";
import "./myChecklists.css";

export default class MyChecklists extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const requestHeaders = {
      'Content-Type': "application/json",
      "x-auth-token": sessionStorage.getItem("x-auth-token")
    };
    try {
      let response = await fetch(`/user`, {
        method: 'get',
        headers: requestHeaders,
      })
      response = await response.json()
      console.log(response)
      this.setState({ data: response.checkLists })
    } catch (err) { console.log(err) }
  }

  componentDidUpdate(prevProps) {
    if (this.props.newChecklist !== prevProps.newChecklist) {
      this.setState({
        data: [...this.state.data, this.props.newChecklist]
      })
    }
  }

  async deleteChecklist() {
    console.log(this)
    const that = this.state.data[0];
    const token = sessionStorage.getItem('x-auth-token');
    const requestHeaders = {
      'Content-Type': "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      const response = await fetch(`/checklist/:${this.state.data}`, {
        method: "delete",
        headers: requestHeaders
      })
      if (response.status !== 200) throw response;
    } catch (error) {
      alert("Nie udało się połączyć z serwerem!");
      return
    };
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
            {this.state.data ? this.state.data.map(el =>
              <li className="mychecklists_checklista" key={el.title}>
                {el.title}
                <i className="material-icons icon-float icon-color">link</i>
                <i className="material-icons icon-float icon-color">book</i>
                <i className="material-icons icon-float icon-color" onClick={() => this.deleteChecklist()}>delete</i>
                <div className="mychecklist_author">Autor: {el.author}</div>
              </li>) : null}
          </ul>
        </div>
      </section>
    );
  };
};