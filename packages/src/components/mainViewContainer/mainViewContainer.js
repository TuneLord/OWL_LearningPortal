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
        updateNumber: 0,
        activeChecklist: 0
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
        if (document.querySelector('.mychecklists_checklista')) {
            checklistsList.insertBefore(checklistNameContainer, document.querySelector('.mychecklists_checklista'));
        } else {
            checklistsList.appendChild(checklistNameContainer);
        }
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
                name: addInput.value,
                author: 'Próba',
                isDone: false,
                id: 0
            },
            activeEditor: true
        });

        const token = sessionStorage.getItem('x-auth-token');
        const requestHeaders = {
            'Content-Type': "application/json; charset=UTF-8",
            "x-auth-token": token
        };
        const requestBody = {
            'name': addInput.value,
            'content': null
        };

        try {
            let response = await fetch(`/checklist`, {
                method: "post",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            })
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({ activeChecklist: response[response.length - 1] });
            this.updateChecklistNumber();
        } catch (error) {
            alert("Nie udało się połączyć z serwerem!");
            return
        };

        addInput.parentElement.remove();
        this.changeDisabled();
    };

    editChecklistName(e) {
        if (this.state.activeEditor) return
        const checklist = e.currentTarget;
        const parent = e.currentTarget.parentElement;
        const checklistNameContainer = document.createElement('div');
        const checklistNameInput = document.createElement('input');
        checklistNameInput.className = 'addInput';
        const checklistNameButton = document.createElement('button');
        checklistNameButton.className = 'addButton';
        checklistNameButton.innerText = 'Zmień nazwę';
        const checklistNameCancel = document.createElement('div');
        checklistNameCancel.innerHTML = `<i class="fas fa-times"></i>`;
        const checklistsList = document.querySelector('.mychecklists_list');
        checklistsList.insertBefore(checklistNameContainer, parent);
        parent.hidden = true;
        checklistNameContainer.appendChild(checklistNameInput);
        checklistNameContainer.appendChild(checklistNameButton);
        checklistNameContainer.appendChild(checklistNameCancel);
        checklistNameCancel.addEventListener('click', () => {
            parent.hidden = false;
            checklistNameContainer.remove();
        });
        checklistNameButton.addEventListener('click', async () => {

            const token = sessionStorage.getItem('x-auth-token');
            const requestHeaders = {
                'Content-Type': "application/json",
                "x-auth-token": token
            };
            const requestBody = {
                'name': checklistNameInput.value
            };

            try {
                const response = await fetch(`/checklist/${checklist.id}`, {
                    method: "put",
                    headers: requestHeaders,
                    body: JSON.stringify(requestBody)
                })
                if (response.status !== 200) throw response;
                checklist.innerText = checklistNameInput.value;
                parent.hidden = false;
                checklistNameContainer.remove();
            } catch (error) {
                console.log(error)
                alert("Nie udało się połączyć z serwerem!");
                return
            };
        })
    };

    async saveChecklist(e) {
        const that = this;
        this.setState({
            activeEditor: false,
            disabled: 'disabled',
            saveDisplay: 'none',
            cleanEditor: true,
        });

        sessionStorage.setItem("draftail:content", JSON.stringify(""))
        const token = sessionStorage.getItem('x-auth-token');
        const content = sessionStorage.getItem('draftail:content');
        const requestHeaders = {
            'Content-Type': 'application/json',
            "x-auth-token": token
        };
        const requestBody = {
            'content': content
        };

        try {
            const response = await fetch(`/checklist/${that.state.activeChecklist.listId}`, {
                method: "put",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            })
            if (response.status !== 200) throw response;
        } catch (error) {
            console.log(error);
            alert("Nie udało się połączyć z serwerem!");
            return
        };
    };

    updateChecklistNumber() {
        this.setState({ updateNumber: this.state.updateNumber + 1 })
    };

    selectChecklist() { }

    render() {
        const windowWidth = window.innerWidth;

        return (
            <section className="mainView__container">
                <div className="mainView__header">
                    {windowWidth < 1025 ? <div
                        onClick={this.props.onClick}>
                        <i className="fas fa-bars"></i></div> : null}
                    <h2>Panel mentora</h2>
                </div>
                <div className="stateContainter">
                    <ChecklistCounter
                        number={this.state.checklistNumber}
                        updateNumber={this.state.updateNumber} />
                    <CreateNewChecklistButton
                        onClick={() => this.createChecklistNameInput()} />
                </div>
                {windowWidth > 1025 ? <ChecklistEditorContainer
                    cleanEditor={this.state.cleanEditor}
                    onClick={() => this.saveChecklist()}
                    disabled={this.state.disabled}
                    saveDisplay={this.state.saveDisplay} /> : null}
                <MyChecklists
                    editChecklistName={(e, listId) => this.editChecklistName(e, listId)}
                    updateChecklistNumber={() => this.updateChecklistNumber()}
                    newChecklist={this.state.newChecklist} />
            </section>
        )
    };
};