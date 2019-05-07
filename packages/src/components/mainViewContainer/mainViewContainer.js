import React, { Component } from 'react';
import './mainViewContainer.css';
import { ChecklistCounter } from './checklistCounter';
import { CreateNewChecklistButton } from './createNewChecklist';
import ChecklistEditorContainer from './checklistEditorContainer';


export class MainViewContainer extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const windowWidth = window.innerWidth;

        return (
            <section className="mainViewContainer">
                <div className="mainViewHeader">
                    <h2>Panel mentora</h2>
                </div>
                <div className="stateContainter">
                    <ChecklistCounter number='1' />
                    <CreateNewChecklistButton />
                </div>
                {windowWidth > 1025 ?
                    <ChecklistEditorContainer /> :
                    null}
            </section>
        )
    }
}