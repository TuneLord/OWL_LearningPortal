import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import './checklistEditorContainer.css';
import TextEditor from '../TextEditor/index';
import TextReader from '../TextReader/index';

export default class ChecklistEditorContainer extends Component {
    state = {
        isContentLoaded: true,
        initial: "",
        onlyToRead: false
    };

    componentDidUpdate(prevProps) {
        if (this.props.cleanEditor !== prevProps.cleanEditor) {
            this.setState({ initial: "" });
        }
    };


    onSave = (content) => {
        sessionStorage.setItem("draftail:content", JSON.stringify(content))
    };

    changeOnlyToRead() {
        if (!this.state.onlyToRead) this.setState({ onlyToRead: true })
        if (this.state.onlyToRead) this.setState({ onlyToRead: false })
    };

    render() {
        return (
            <section className="checklistEditor__container">
                <div className="checklist__header">
                    <h3>AKTUALNA LISTA: </h3>
                    <button className="checklist__header-change"
                        onClick={() => this.changeOnlyToRead()}
                        style={{ display: this.props.saveDisplay }}> Zmiana edytora
                    </button>
                    <button className="checklist__header-save"
                        onClick={this.props.onClick}
                        style={{ display: this.props.saveDisplay }}> Zapisz listę
                    </button>
                </div>
                <div className="checklistEditor" >
                    <div className={this.props.disabled}></div>
                    {this.state.onlyToRead ? <TextReader value={this.state.initial} /> : <TextEditor value={this.state.initial} onSave={this.onSave} />}
                </div>
            </section>
        );
    };
};