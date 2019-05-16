import React, { Component } from "react";
import "./myChecklists.css";

export default class MyChecklists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
      data: []
    };
  }

  async componentDidMount() {
    await this.getChecklistsFromServer(); 
   
    const lastList = this.state.data;
    if (lastList.length > 0) {
      const id = lastList[lastList.length - 1].listId;
      const name = lastList[lastList.length - 1].name;
      this.props.chooseList(id, name);
    }

    this.props.isLoaded();
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
      this.setState({
        data: response.checkLists
      });
      if (this.interval) clearInterval(this.interval);

    } catch (err) {
      if (!this.interval) {
        const callback = this.getChecklistsFromServer.bind(this);
        this.interval = setInterval(callback, 5000);
      }
      console.log(err);
      return;
    }
  }
  async deleteChecklist(e, listId) {
    e.stopPropagation();
    // if (this.props.activeEditor) return;
    if (this.props.inputExist) return;
    const token = localStorage.getItem("x-auth-token");
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
      this.setState({
        data: this.state.data.filter(el => el.listId !== listId)
      });   
      this.props.updateChecklistNumber();
      this.props.chooseList(this.state.data[this.state.data.length-1].listId, this.state.data[this.state.data.length-1].name)
    } catch (error) {
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
          return
        };
      }

  filterOwned = el => el.isOwner === true;

  filterShared = el => el.isOwner === false;

  clickList(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const name = e.currentTarget.getAttribute('data-name');
    this.props.chooseList(id, name);
    // this.props.changeEditorToReader();  
  };

  editName(e, listId) {
    this.props.editChecklistName(e, listId);
  }

  createMyChecklist = (el) => {
    const windowWidth = window.innerWidth;

    return (
      <li
        data-name={el.name}
        data-id={el.listId}
        className="mychecklists_checklista"
        key={el.listId}
        onClick={e => this.clickList(e)}
      >
        <div className="desc">
          <span>{el.name}</span>
          <span className="mychecklist_author">Autor: {el.listAuthor}</span>
        </div>
        <div className="to-right">
        {windowWidth > 1024 &&
          <i
            className="material-icons icon-float icon-color"
            onClick={(e) => this.props.editChecklist(e, el.listId, el.name)}
          >
            edit
          </i>
        }
        <i
          className="material-icons icon-float icon-color"
          onClick={(e) => this.editName(e, el.listId)}
        >
          title{" "}
        </i>
        <i
          className="material-icons icon-float icon-color"
          onClick={(e) => this.deleteChecklist(e, el.listId)}
        >
          delete
        </i>
        </div>
      </li>
    ) 
};

  createSharedChecklist = el => (
    <li
      id={el.name}
      data-name={el.name}
      data-id={el.listId}
      className="mychecklists_checklista"
      key={el.listId}
      onClick={e => this.clickList(e)}
    >
     <p id={el.listId}> 
      <i className="material-icons icon-check icon-color" onClick={() => this.toggleCheck(el.listId)}>check_circle_outline</i>
    </p>
      <div className="desc">
        <span style={{ textDecoration: el.isChecked ? 'line-through' : 'inherit', 
                  fontStyle: el.isChecked ? 'italic' : 'inherit'}}>{el.name}</span>
        <span className="mychecklist_author">Autor: {el.listAuthor}</span>
      </div>
      <i
        className="material-icons icon-float icon-color to-right"
        onClick={() => this.unsubCheckList(el.listId)}
      >
        delete
			</i>
     
    </li>
  );

  StandardRender = () => (
    <section id="mychecklists">
      <div className="content">
        <div className="title-content">
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

      <div className="content">
        <div className="title-content">
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
    return <StandardRender />;
  }
  render() {
    return this.createRender();
  }
}
