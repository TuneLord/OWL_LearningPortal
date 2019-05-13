import React, { Component } from 'react';
import './mainViewContainer.css';
import { ChecklistCounter } from './checklistCounter';
import { CreateNewChecklistButton } from './createNewChecklist';
import ChecklistEditorContainer from './checklistEditorContainer';
import MyChecklists from '../MainView/myChecklists';

export default class MainViewContainer extends Component {
    state = {
        checklistNumber: 2,
        disabled: 'disabled',
        saveDisplay: 'none',
        newChecklist: {},
        activeEditor: false,
        cleanEditor: false,
    };

    changeDisabled() {
        this.setState({
            disabled: null,
            saveDisplay: 'block'
        });
    };

    createChecklistNameInput() {
        if (this.state.activeEditor) return
        const checklistNameContainer = document.createElement('div');
        const checklistNameInput = document.createElement('input');
        checklistNameInput.className = 'addInput';
        const checklistNameButton = document.createElement('button');
        checklistNameButton.className = 'addButton';
        checklistNameButton.innerText = 'Dodaj';
        const checklistsList = document.querySelector('.mychecklists_list');
        checklistsList.appendChild(checklistNameContainer);
        checklistNameContainer.appendChild(checklistNameInput);
        checklistNameContainer.appendChild(checklistNameButton);
        checklistNameButton.onclick = this.createNewChecklist.bind(this);
    };

    async createNewChecklist() {
        const addInput = document.querySelector('.addInput');
        const newChecklistNumber = this.state.checklistNumber + 1;
        this.setState({
            checklistNumber: newChecklistNumber,
            newChecklist: {
                title: addInput.value,
                author: 'Próba',
                isDone: false,
            },
            activeEditor: true
        });

        // const token = sessionStorage.getItem('x-auth-token');
        // const requestHeaders = {
        //     'Content-Type': 'application/json',
        //     "x-auth-token": token
        // };
        // const requestBody = {
        //     'name': this.state.title,
        //     'content': 'dupa'
        // };

        // try {
        //     const response = await fetch(`/checklist`, {
        //         method: "post",
        //         headers: requestHeaders,
        //         body: JSON.stringify(requestBody)
        //     })
        //     if (response.status !== 200) throw response;
        // } catch (error) {
        //     alert("Nie udało się połączyć z serwerem!");
        //     return
        // };

        addInput.parentElement.remove();
        this.changeDisabled();
    };

    async saveChecklist() {
        this.setState({
            activeEditor: false,
            disabled: 'disabled',
            saveDisplay: 'none',
            cleanEditor: true,
        });

        sessionStorage.setItem("draftail:content", JSON.stringify(""))
        // const token = sessionStorage.getItem('x-auth-token');
        // const content = sessionStorage.getItem('draftail:content');
        // const requestHeaders = {
        //     'Content-Type': 'application/json',
        //     "x-token": token
        // };
        // const requestBody = {
        //     'name': this.state.title,
        //     'content': content
        // };

        // try {
        //     const response = await fetch(`/checklist`, {
        //         method: "put",
        //         headers: requestHeaders,
        //         body: JSON.stringify(requestBody)
        //     })
        //     if (response.status !== 200) throw response;
        // } catch (error) {
        //     alert("Nie udało się połączyć z serwerem!");
        //     return
        // };
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
                    <CreateNewChecklistButton onClick={() => this.createChecklistNameInput()} />
                </div>
                {windowWidth > 1025 ? <ChecklistEditorContainer cleanEditor={this.state.cleanEditor} onClick={() => this.saveChecklist()} disabled={this.state.disabled} saveDisplay={this.state.saveDisplay} /> : null}
                <MyChecklists newChecklist={this.state.newChecklist} />
            </section>
        )
    };
};