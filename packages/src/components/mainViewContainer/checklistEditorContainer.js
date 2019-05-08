import React, { Component } from 'react';
import './checklistEditorContainer.css';


export default class ChecklistEditorContainer extends Component {
    // constructor(props){
    // super(props)
    // }
    render() {
        return (
            <section className="checklistEditor__container">
                <div className="checklist__header">
                    <h3>Edytuj listę</h3>
                </div>
                <div className="checklistEditor">
                    <p>Tutaj będzie edytor</p>
                </div>
            </section>

        );
    };
};