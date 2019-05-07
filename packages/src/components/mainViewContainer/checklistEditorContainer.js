import React, { Component } from 'react';
import './checklistEditorContainer.css';


export default class ChecklistEditorContainer extends Component {
    // constructor(props){
    // super(props)
    // }
    render() {
        return (
            <section className="checklistEditorContainer">
                <div className="checklistHeader">
                    <h3>Edytuj checklistę</h3>
                </div>
                <div className="checklistEditor">
                    <p>Tutaj będzie edytor</p>
                </div>
            </section>

        );
    };
};