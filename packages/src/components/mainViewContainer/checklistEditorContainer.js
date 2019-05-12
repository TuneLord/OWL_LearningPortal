import React, { Component } from 'react';
import './checklistEditorContainer.css';
import TextEditor from '../TextEditor/index';

export default class ChecklistEditorContainer extends Component {

    render() {
        return (
            <section className="checklistEditor__container">
                <div className="checklist__header">
                    <h3>EDYTOR LISTY</h3>
                    <button className="checklist__header-save" style={{ display: this.props.saveDisplay }}> Zapisz listę </button>
                </div>
                <div className="checklistEditor" >
                    <div className={this.props.disabled}></div>
                    <TextEditor />
                </div>
            </section>

        );
    };
};