import React, { Component } from "react";
import { Loader } from "../Loader/loader";
import "./myChecklists.css";

export default class MyChecklists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
      data: [],
      myLists: [],
      noMyLists: [],
      isLoaded: false
    };

    // this.deleteChecklist = this.deleteChecklist.bind(this);
  }

  componentDidMount() {
    this._getChecklistsFromServer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.newChecklist !== prevProps.newChecklist) {
      this.setState({
        data: [...this.state.data, this.props.newChecklist]
      });
    }
  }

  async _getChecklistsFromServer() {
    const requestHeaders = {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("x-auth-token")
    };
    try {
      let response = await fetch(`/user`, {
        method: "get",
        headers: requestHeaders
      });
      if (!response.ok) throw response;
      response = await response.json();
      this.setState({
        author: response.name,
        data: response.checkLists,
        isLoaded: true
      });
      this.checkIsOwner();
      this.checkIsShared();
      if (this._interval) clearInterval(this._interval);
    } catch (err) {
      if (this._interval) {
        alert("Nie udało się połączyć z serwerem!");
        this._interval = setInterval(
          this._getChecklistsFromServer.bind(this),
          5000
        );
      }
      console.log(err);
      return;
    }
  }
  async deleteChecklist(listId) {
    const token = sessionStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      let response = await fetch(`/checklist/${listId}`, {
        method: "delete",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      // try {
      // 	this.setState({ isLoaded: false });
      // 	let response = await fetch(`/user`, {
      // 		method: "get",
      // 		headers: requestHeaders
      // 	});
      // 	if (response.status !== 200) throw response;
      //   response = await response.json();
      //   console.log(response);
      //   console.log(this.state);
      // } catch (err) {
      //   console.log(err);
      // }
      // console.log(this.state.date)
      this.setState({
        // author: response.name,
        data: this.state.data.filter(el => el.listId !== listId),
        isLoaded: true
      });
      this.props.updateChecklistNumber();
    } catch (error) {
      alert("Nie udało się połączyć z serwerem!");
    }
  }

  _createChecklist = el => (
    <li className="mychecklists_checklista" key={el.name}>
      <p id={el.listId} onClick={this.props.editChecklistName}>
        {el.name}
      </p>
      <i className="material-icons icon-float icon-color">link</i>
      <i className="material-icons icon-float icon-color">edit</i>
      <i
        className="material-icons icon-float icon-color"
        onClick={() => this.deleteChecklist(el.listId)}
      >
        delete
			</i>
      <div className="mychecklist_author">Autor: {this.state.author}</div>
    </li>
  );

  async unsubCheckList(listId) {
    const token = sessionStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    try {
      const response = await fetch(`/share/unsub/${listId}`, {
        method: "put",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      try {
        let response = await fetch(`/user`, {
          method: "get",
          headers: requestHeaders
        });
        if (response.status !== 200) throw response;
        response = await response.json();
        this.setState({
          author: response.name,
          data: response.checkLists
        });
        this.props.updateChecklistNumber();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      alert("Nie udało się połączyć z serwerem!");
      console.log(err);
      return;
    }
  }

  checkIsOwner() {
    const ownerLists = this.state.data.filter(el => {
      return el.isOwner === true;
    });
    this.setState({ myLists: ownerLists });
  }

  checkIsShared() {
    console.log(this.state.data);
    const sharedLists = this.state.data.filter(el => {
      return el.isOwner === false;
    });
    this.setState({ noMyLists: sharedLists });
  }

  clickSharedList(e) {
    this.props.chooseList(e);
    this.props.changeEditorToReader();
  }

  clickSharedList(e) {
    this.props.chooseList(e);
    this.props.changeEditorToReader();
  }

  StandardRender = () => (
    <section id="mychecklists">
      <div className="mychecklists_container">
        <div className="mychecklists_title">
          <i className="material-icons"> school </i>
          <h3 className="mychecklists_title__header">Moje checklisty</h3>
        </div>
        <ul className="mychecklists_list">
          {this.state.data ? this.state.myLists.map(el =>
            <li id={el.name} className="mychecklists_checklista" key={el.name} onClick={this.props.chooseList}>
              <p id={el.listId} >{el.name}</p>
              <i className="material-icons icon-float icon-color">link</i>
              <i className="material-icons icon-float icon-color">edit</i>
              <i className="material-icons icon-float icon-color" onClick={this.props.editChecklistName}>title </i>
              <i className="material-icons icon-float icon-color" onClick={() => this.deleteChecklist(el.listId)}>delete</i>
              <div className="mychecklist_author">Autor: {this.state.author}</div>
            </li>) : null}
        </ul>
      </div>

      <div className="sharedchecklists_container" >
        <div className="mychecklists_title">
          <i className="material-icons"> school</i>
          <h3 className="mychecklists_title__header">Udostępnione checklisty</h3>
        </div>
        <ul className="mychecklists_list">
          {this.state.data ? this.state.noMyLists.map(el =>
            <li id={el.name} className="mychecklists_checklista" key={el.name} onClick={(e) => this.clickSharedList(e)}>
              <p id={el.listId}>{el.name}</p>
              <i className="material-icons icon-float icon-color">link</i>
              {/* <i className="material-icons icon-float icon-color">edit</i> */}
              <i className="material-icons icon-float icon-color" onClick={() => this.unsubCheckList(el.listId)}>delete</i>
              <div className="mychecklist_author">Autor: {this.state.author}</div>
            </li>) : null}
        </ul>
      </div>
    </section>
  );



  _createRender() {
    const { StandardRender } = this;
    return this.state.isLoaded ? <StandardRender /> : <Loader />;
  }
  render() {
    return this._createRender()
  }
}