import React, { Component } from 'react';
import './mainViewContainer.css';
import { ChecklistCounter } from './checklistCounter';
import { CreateNewChecklistButton } from './createNewChecklist';
import ChecklistEditorContainer from './checklistEditorContainer';
import MyChecklists from '../MainView/myChecklists';

export default class MainViewContainer extends Component {
    state = {
        checklistNumber: 1,
        disabled: 'disabled',
        saveDisplay: 'none'
    };

    changeDisabled() {
        this.setState({
            disabled: null,
            saveDisplay: 'block'
        })
    }

    render() {
        const windowWidth = window.innerWidth;

        return (
            <section className="mainView__container">
                <div className="mainView__header">
                    {windowWidth < 1025 ? <div onClick={this.props.onClick}><i className="fas fa-bars"></i></div> : null}
                    <h2>Panel mentora</h2>
                </div>
                <div className="stateContainter">
                    <ChecklistCounter number={this.state.checklistNumber} />
                    <CreateNewChecklistButton onClick={() => this.changeDisabled()} />
                </div>
                {windowWidth > 1025 ? <ChecklistEditorContainer disabled={this.state.disabled} saveDisplay={this.state.saveDisplay} /> : null}
                <MyChecklists />
            </section>
        )
    }
}