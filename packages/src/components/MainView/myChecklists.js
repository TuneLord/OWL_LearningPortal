import React, { Component } from "react";
import { Loader } from "../Loader/loader";
import "./myChecklists.css";

export default class MyChecklists extends Component {
	constructor(props) {
		super(props);

		this.state = {
			author: null,
			data: [],
			isLoaded: false
		};

		// this.deleteChecklist = this.deleteChecklist.bind(this);
	}

	async componentDidMount() {
		const requestHeaders = {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("x-auth-token")
		};
		try {
			let response = await fetch(`/user`, {
				method: "get",
				headers: requestHeaders
			});
			response = await response.json();
			this.setState({
				author: response.name,
				data: response.checkLists,
				isLoaded: true
			});
		} catch (err) {
			console.log(err);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.newChecklist !== prevProps.newChecklist) {
			this.setState({
				data: [...this.state.data, this.props.newChecklist]
			});
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
        data: this.state.data.filter( el => el.listId !== listId),
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

	StandardRender = () => (
		<section id="mychecklists">
			<div className="mychecklists_container">
				<div className="mychecklists_title">
					<i className="material-icons">school</i>
					<h3 className="mychecklists_title__header">Moje checklisty</h3>
				</div>
				<ul className="mychecklists_list">
					{this.state.data ? this.state.data.map(this._createChecklist) : null}
				</ul>
			</div>
		</section>
	);

	_createRender() {
		const { StandardRender } = this;
		return this.state.isLoaded ? <StandardRender /> : <Loader />;
	}

	render() {
		return this._createRender();
	}
}
