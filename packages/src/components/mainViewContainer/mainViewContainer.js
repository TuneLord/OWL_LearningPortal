import React, { Component } from 'react';
import './mainViewContainer.css';
import { ChecklistCounter } from './checklistCounter';
import { CreateNewChecklistButton } from './createNewChecklist';
import ChecklistEditorContainer from './checklistEditorContainer';


export default class MainViewContainer extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const windowWidth = window.innerWidth;

        return (
            <section className="mainView__container">
                <div className="mainView__header">
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