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
        saveDisplay: 'none',
        newChecklist: {},
    };

    changeDisabled() {
        this.setState({
            disabled: null,
            saveDisplay: 'block'
        });
    };

    createChecklistNameInput() {
        const checklistNameContainer = document.createElement('div');
        const checklistNameInput = document.createElement('input');
        checklistNameInput.className = 'addInput';
        const checklistNameButton = document.createElement('button');
        checklistNameButton.innerText = 'Dodaj';
        const checklistsList = document.querySelector('.mychecklists_list');
        checklistsList.appendChild(checklistNameContainer);
        checklistNameContainer.appendChild(checklistNameInput);
        checklistNameContainer.appendChild(checklistNameButton);
        checklistNameButton.onclick = this.createNewChecklist.bind(this);
    };

    createNewChecklist() {
        const addInput = document.querySelector('.addInput');
        this.setState({
            newChecklist: {
                title: addInput.value,
                author: 'Próba',
                isDone: false,
            }
        });

        addInput.parentElement.remove();
        this.changeDisabled();
    };

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
                    <CreateNewChecklistButton onClick={() => this.createChecklistNameInput()} />
                </div>
                {windowWidth > 1025 ? <ChecklistEditorContainer disabled={this.state.disabled} saveDisplay={this.state.saveDisplay} /> : null}
                <MyChecklists newChecklist={this.state.newChecklist} />
            </section>
        )
    };
};