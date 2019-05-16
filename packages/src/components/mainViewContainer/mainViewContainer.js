import React, { Component } from "react";
import "./mainViewContainer.css";
import { ChecklistCounter } from "./checklistCounter";
import { CreateNewChecklistButton } from "./createNewChecklist";
import ChecklistEditorContainer from "./checklistEditorContainer";
import MyChecklists from "../MainView/myChecklists";
import UserInputDialogContent from "../UserInputDialogContent";
import { Dialog } from "@material-ui/core";
import { Loader } from "../Loader/loader";

export default class MainViewContainer extends Component {
    state = {
        checklistNumber: 0,
        disabled: "disabled",
        saveDisplay: "none",
        newChecklist: {},
        activeEditor: false,
        cleanEditor: false,
        updateNumber: 0,
        activeChecklist: null,
        chosenList: "",
        showReader: true,
        loadedContent: 0,
        inputExist: false,
        changeNameInputExist: false,
        dialogId: "",
        dialogTitle: "",
        dialogLabel: "",
        dialogCallback: () => null,
        dialogOpen: false,
        isLoaded: false
    };

    changeDisabled() {
        this.setState({
            disabled: null,
            saveDisplay: "block"
        });
    }

    createChecklistNameInput() {
        // if (this.state.activeEditor) return;
        if (this.state.inputExist) return;
        if (this.state.changeNameinputExist) return;
        
        this.setState({
            dialogOpen: true,
            dialogTitle: "Wpisz nazwę nowej listy",
            dialogId: "newListDialog",
            dialogLabel: "Nazwa",
            dialogCallback: this.createNewChecklist.bind(this)
        });
    }
	
    async createNewChecklist(name) {
		if(!name) return;
		// const addInput = document.querySelector(".addInput");
        const newChecklistNumber = this.state.checklistNumber + 1;

        const token = localStorage.getItem("x-auth-token");
        const requestHeaders = {
            "Content-Type": "application/json; charset=UTF-8",
            "x-auth-token": token
        };
        const requestBody = {
            name,
            content: null
        };

        try {
            let response = await fetch(`/checklist`, {
                method: "post",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            response = await response.json();           
            this.setState({
                activeChecklist: response[response.length - 1].listId,
                checklistNumber: newChecklistNumber,
                newChecklist: response[response.length - 1]
            });
            this.chooseList(response[response.length - 1].listId, response[response.length - 1].name);
            this.updateChecklistNumber();           
            this.setState({
                activeEditor: true,
                showReader: false
            });
            this.changeDisabled();
        this.setState({ dialogOpen: false });
        } catch (error) {
            return;
        }   
    }

    editExistList(e, id, name) {
        e.stopPropagation();
        if (this.state.inputExist) return
        this.chooseList(id, name)

        this.setState({
            activeEditor: true,
            showReader: false
        });
        this.changeDisabled();
    }

    async putChecklistOnServer(name) {
		if(!name) return;
        const token = localStorage.getItem("x-auth-token");
        const requestHeaders = {
            "Content-Type": "application/json",
            "x-auth-token": token
        };
        const requestBody = {
            name
        };
        try {
            this.setState({ isLoaded: false });
            const response = await fetch(`/checklist/${this.tempListId}`, {
                method: "put",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            const json = await response.json();
            const changedList = {
                listId: json._id,
                name: json.name,
                isOwner: true,
                listAuthor: json.authorName,
                isChecked: false
            };
            
            this.setState({ newChecklist: changedList });
            this.chooseList(this.tempListId, name);
            this.setState({ isLoaded: true });
        } catch (error) {
            console.log(error);
        }
        this.tempListId = undefined;
        this.setState({ dialogOpen: false });
    }

    editChecklistName(e, listId) {
        e.stopPropagation();
        // if (this.state.activeEditor) return;
        if (this.state.inputExist) return;
        if (this.state.changeNameinputExist) return;
        this.tempListId = listId;
     
        this.setState({
            dialogOpen: true,
            dialogTitle: "Wpisz nową nazwę listy",
            dialogId: "newListDialog",
            dialogLabel: "Nazwa",
            dialogCallback: this.putChecklistOnServer.bind(this)
        });
    }

    async saveChecklist(isChange) {
        this.changeEditorToReader()
        if (isChange === false) {
            this.setState({
                activeEditor: false,
                disabled: "disabled",
                saveDisplay: "none",
                cleanEditor: true
            });
            return;
        }

        let listId = this.state.activeChecklist;
        let name = this.state.chosenList;

        const token = localStorage.getItem("x-auth-token");
        const content = sessionStorage.getItem("draftail:content");
        const requestHeaders = {
            "Content-Type": "application/json",
            "x-auth-token": token
        };
        const requestBody = {
            content: content
        };
       
        try {
            let response = await fetch(`/checklist/${listId}`, {
                method: "put",
                headers: requestHeaders,
                body: JSON.stringify(requestBody)
            });
            if (response.status !== 200) throw response;
            response = await response.json();
            this.setState({
                activeEditor: false,
                disabled: "disabled",
                saveDisplay: "none",
                cleanEditor: true
            });

            this.chooseList(listId, name);
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async chooseList(id, name) {
        if (this.state.activeEditor) {
            this.setState({
                activeEditor: false,
                showReader: true,
                disabled: "disabled",
                saveDisplay: "none",
            });
        }
        if (this.state.inputExist) return;
    
        this.setState({ activeChecklist: id });
        this.setState({ chosenList: name });

        const token = localStorage.getItem("x-auth-token");
        const requestHeaders = {
            "Content-Type": "application/json",
            "x-auth-token": token
        };
        try {
            this.setState({ isLoaded: false });
            let response = await fetch(`/checklist/${id}`, {
                method: "get",
                headers: requestHeaders
            });
            if (response.status !== 200) throw response;
            response = await response.json();
            const content = response.content;
            sessionStorage.setItem("draftail:content", content);
            this.setState({ isLoaded: true });
            this.setState({ loadedContent: this.state.loadedContent + 1 });
            
        } catch (error) {
            console.log(error);
            return;
        }
    };

    updateChecklistNumber() {
        this.setState({ updateNumber: this.state.updateNumber + 1 });
    };

    changeEditorToReader() {
        this.setState({ showReader: true });
    };

    changeReaderToEditor() {
        this.setState({ showReader: false });
    };

    isLoaded() {
        this.setState({ isLoaded: true });
    }

    render() {
        const windowWidth = window.innerWidth;
        // alert(this.state.showReader)

        return (
            <div className="container">
                <header className="header">
                    <h2>Panel użytkownika</h2>
                    {windowWidth <= 1024 ? <div className="menu-burger" onClick={this.props.onClick}><i className="fas fa-bars"></i></div> : null}
                </header>
                <aside className="state-container">
                    <ChecklistCounter
                        number={this.state.checklistNumber}
                        updateNumber={this.state.updateNumber}
                    />
                    <CreateNewChecklistButton
                        onClick={() => this.createChecklistNameInput()}
                    />
                </aside>
                <div className = "aside">
                <MyChecklists
                    editChecklist={(e, id, name) => this.editExistList(e, id, name)}
                    editChecklistName={(e, listId) => this.editChecklistName(e, listId)}
                    updateChecklistNumber={() => this.updateChecklistNumber()}
                    newChecklist={this.state.newChecklist}
                    chooseList={(id, name) => this.chooseList(id, name)}
                    changeEditorToReader={() => this.changeEditorToReader()}
                    changeReaderToEditor={() => this.changeReaderToEditor()}
                    activeEditor={this.state.activeEditor}
                    inputExist={this.state.inputExist}
                    isLoaded={() => this.isLoaded()}
                />
                </div>
                 <section className="checkList-editor-content content">
                    <div className="title-content">
                        <i className="fas fa-tasks"></i>
                        <h3>Aktualna lista</h3>
                    </div>
                    {this.state.isLoaded === true ?
                        <ChecklistEditorContainer
                            cleanEditor={this.state.cleanEditor}
                            showLoadedContent={this.state.loadedContent}
                            onClick={(isChange) => this.saveChecklist(isChange)}
                            disabled={this.state.disabled}
                            chosenList={this.state.chosenList}
                            showReader={this.state.showReader}
                            saveDisplay={this.state.saveDisplay}                 
                        />
                    : <Loader />
                    }
                </section>
                <Dialog open={this.state.dialogOpen}>
                    <UserInputDialogContent
                        title={this.state.dialogTitle}
                        inputId={this.state.dialogId}
                        type={"text"}
                        placeholder={""}
                        label={this.state.dialogLabel}
                        callback={this.state.dialogCallback}
                        onClose={() => this.setState({ dialogOpen: false })}
                    />
                </Dialog>
            </div>
        );
    }
}