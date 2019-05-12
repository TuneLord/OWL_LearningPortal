import React, { Component } from 'react';
import './checklistEditorContainer.css';
import TextEditor from '../TextEditor/index';
import TextReader from '../TextReader/index';

export default class ChecklistEditorContainer extends Component {
    state = {
        onlyToRead: false
    };

    changeOnlyToRead() {
        if (!this.state.onlyToRead) this.setState({ onlyToRead: true })
        if (this.state.onlyToRead) this.setState({ onlyToRead: false })
    };

    render() {
        return (
            <section className="checklistEditor__container">
                <div className="checklist__header">
                    <h3>EDYTOR LISTY</h3>
                    <button className="checklist__header-change" onClick={() => this.changeOnlyToRead()} style={{ display: this.props.saveDisplay }}> Zmiana edytora </button>
                    <button className="checklist__header-save" style={{ display: this.props.saveDisplay }}> Zapisz listę </button>
                </div>
                <div className="checklistEditor" >
                    <div className={this.props.disabled}></div>
                    {this.state.onlyToRead ? <TextReader /> : <TextEditor />}
                </div>
            </section>
        );
    };
};