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
  }

  componentDidMount() {
    this.getChecklistsFromServer();
  }

  componentDidUpdate(prevProps) {
    const { newChecklist } = this.props;
    if (newChecklist !== prevProps.newChecklist) {
      const matchingList = this.state.data.find(
        list => list.listId === newChecklist.listId
      );
      if (matchingList) {
        this.setState({ data: this.state.data.map(list => (list !== matchingList) ? list : newChecklist) })
      } else {
        this.setState({
          data: [...this.state.data, newChecklist]
        });
      }
    }
  }

  async getChecklistsFromServer() {
    const requestHeaders = {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("x-auth-token")
    };
    try {
      let response = await fetch(`/user`, {
        method: "get",
        headers: requestHeaders
      });
      if (!response.ok) throw response;
      response = await response.json();
      console.log(response.checkLists)
      this.setState({
        data: response.checkLists,
        isLoaded: true
      });
      if (this.interval) clearInterval(this.interval);
    } catch (err) {
      if (!this.interval) {
        const callback = this.getChecklistsFromServer.bind(this);
        alert("Nie udało się połączyć z serwerem!");
        this.interval = setInterval(callback, 5000);
      }
      console.log(err);
      return;
    }
  }
  async deleteChecklist(listId) {
    if (this.props.activeEditor) return;
    if (this.props.inputExist) return;
    const token = localStorage.getItem("x-auth-token");
    const requestHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      "x-auth-token": token
    };

    this.setState({ isLoaded: false });
    try {
      let response = await fetch(`/checklist/${listId}`, {
        method: "delete",
        headers: requestHeaders
      });
      if (response.status !== 200) throw response;
      this.setState({
        data: this.state.data.filter(el => el.listId !== listId),
        isLoaded: true
      });
      this.props.updateChecklistNumber();
    } catch (error) {
      alert("Nie udało się połączyć z serwerem!");
      this.setState({ isLoaded: false });
    }
  }

  async unsubCheckList(listId) {
    const token = localStorage.getItem("x-auth-token");
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

 async toggleCheck(listId) {
        const token = localStorage.getItem('x-auth-token');
        const requestHeaders = {
          'Content-Type': "application/json; charset=UTF-8",
          "x-auth-token": token
        };
        try {
          let response = await fetch(`/user/checklists`, {
            method: "PUT",
            headers: requestHeaders,
            body: JSON.stringify({
              listId
            }),
          })
          if (response.status !== 200) throw response;
          response = await response.json();
          this.setState({
            data: response
          })
        } catch (error) {
          alert("Nie udało się połączyć z serwerem!");
          return
        };
      }

  filterOwned = el => el.isOwner === true;

  filterShared = el => el.isOwner === false;

  clickSharedList(e) {
    this.props.chooseList(e);
    this.props.changeEditorToReader();
  }

  editName(e, listId) {
    this.props.editChecklistName(e, listId);
  }

  createMyChecklist = el => (
    <li
      id={el.name}
      className="mychecklists_checklista"
      key={el.listId}
      onClick={this.props.chooseList}
    >
      <p id={el.listId}>{el.name}</p>
      <i
        className="material-icons icon-float icon-color"
        onClick={this.props.editChecklist}
      >
        edit
			</i>
      <i
        className="material-icons icon-float icon-color"
        onClick={(e, listId) => this.editName(e, listId)}
      >
        title{" "}
      </i>
      <i
        className="material-icons icon-float icon-color"
        onClick={() => this.deleteChecklist(el.listId)}
      >
        delete
			</i>
      <div className="mychecklist_author">Autor: {el.listAuthor}</div>
    </li>
  );

  createSharedChecklist = el => (
    <li
      id={el.name}
      className="mychecklists_checklista"
      key={el.listId}
      onClick={e => this.clickSharedList(e)}
    >
     <p id={el.listId}> <i className="material-icons icon-check icon-color" onClick={() => this.toggleCheck(el.listId)}>check_circle_outline</i>
      <span style={{ textDecoration: el.isChecked ? 'line-through' : 'inherit', 
                fontStyle: el.isChecked ? 'italic' : 'inherit'}}>{el.name}</span></p>
      <i className="material-icons icon-float icon-color">link</i>
      <i
        className="material-icons icon-float icon-color"
        onClick={() => this.unsubCheckList(el.listId)}
      >
        {/* {" "} */}
        delete
			</i>
      <div className="mychecklist_author">Autor: {el.listAuthor}</div>
    </li>
  );

  StandardRender = () => (
    <section id="mychecklists">
      <div className="mychecklists_container">
        <div className="mychecklists_title">
          <i className="material-icons"> school </i>
          <h3 className="mychecklists_title__header">Moje checklisty</h3>
        </div>
        <ul className="mychecklists_list">
          {this.state.data
            ? this.state.data
              .filter(this.filterOwned)
              .map(this.createMyChecklist)
            : null}
        </ul>
      </div>

      <div className="sharedchecklists_container">
        <div className="mychecklists_title">
          <i className="material-icons"> school</i>
          <h3 className="mychecklists_title__header">
            Udostępnione checklisty
					</h3>
        </div>
        <ul className="mychecklists_list">
          {this.state.data
            ? this.state.data
              .filter(this.filterShared)
              .map(this.createSharedChecklist)
            : null}
        </ul>
      </div>
    </section>
  );

  createRender() {
    const { StandardRender } = this;
    return this.state.isLoaded ? <StandardRender /> : <Loader />;
  }
  render() {
    return this.createRender();
  }
}
