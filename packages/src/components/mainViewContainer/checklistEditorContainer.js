import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import "./checklistEditorContainer.css";
import TextEditor from "../TextEditor/index";
import TextReader from "../TextReader/index";

export default class ChecklistEditorContainer extends Component {
    state = {
        isContentLoaded: true,
        initial: "",
        onlyToRead: this.props.changeEditorToReader,
        disabled: !this.props.changeEditorToReader
    };

    componentDidUpdate(prevProps) {
        
        if (this.props.cleanEditor !== prevProps.cleanEditor) {
            this.setState({ initial: null });
        }      

        if (this.props.showLoadedContent !== prevProps.showLoadedContent) {
            this.setState({
                initial: JSON.parse(sessionStorage.getItem("draftail:content"))
            });
        }
    }

    onSave = content => {
        sessionStorage.setItem("draftail:content", JSON.stringify(content));
    };

    render() {
        return (
            <section className="checkList-editor-content content">
                <div className="title-content">
                    <i className="fas fa-tasks"></i>
                    <h3>Aktualna lista</h3>
                </div>
                <div className="change">
                    <div className="change-title">{this.props.chosenList}</div>
                    <div className = "change-button" style={{ display: this.props.saveDisplay }}>
                        <button onClick={() => this.props.onClick(true)}>Zapisz listę</button>
                        <span>|</span>
                        <button onClick={() => this.props.onClick(false)}>Anuluj</button>
                    </div>
                </div>
                <div className="checklistEditor">
                    <div className={this.state.disabled} />
                    {this.state.isContentLoaded ? (
                        !!this.props.showReader ? (
                            <TextReader value={this.state.initial} />
                        ) : (
                                <TextEditor value={this.state.initial} onSave={this.onSave} />
                            )
                    ) : (
                            <ClipLoader />
                        )}
                </div>
            </section>
        );
    }
}
