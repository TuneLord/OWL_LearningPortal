import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import "./checklistEditorContainer.css";
import TextEditor from "../TextEditor/index";
import TextReader from "../TextReader/index";

export default class ChecklistEditorContainer extends Component {
    state = {
        isContentLoaded: true,
        initial: "",
        onlyToRead: false,
        disabled: this.props.disabled
    };

    componentDidUpdate(prevProps) {
        if (this.props.cleanEditor !== prevProps.cleanEditor) {
            this.setState({ initial: null });
        }

        if (this.props.changeEditorToReader !== prevProps.changeEditorToReader) {
            this.changeOnlyToRead();
            if (this.state.disabled === 'disabled') this.setState({ disabled: '' });
            if (this.state.disabled === '') this.setState({ disabled: 'disabled' });
        }

        // if (this.props.changeReaderToEditor !== prevProps.changeReaderToEditor) {
        //     this.changeOnlyToRead();
        //     this.setState({ disabled: !this.props.disabled });
        //     console.log('dupa')
        // }

        if (this.props.disabled !== prevProps.disabled) {
            this.setState({ disabled: this.props.disabled });
        }

        if (this.props.showLoadedContent !== prevProps.showLoadedContent) {
            this.setState({
                initial: JSON.parse(sessionStorage.getItem("draftail:content"))
            });
        }
    }

    onSave = content => {
        sessionStorage.setItem("draftail:content", JSON.stringify(content));
    };

    changeOnlyToRead() {
        if (!this.state.onlyToRead) this.setState({ onlyToRead: true });
        if (this.state.onlyToRead) this.setState({ onlyToRead: false });
    }

    render() {

        return (
            <section className="checkList-editor-content content">
                <div className="title-content">
                    <i className="fas fa-tasks"></i>
                    <h3>Aktualna lista</h3>
                </div>
                <div className="change">
                    <div className="change-title">{this.props.chosenList}</div>
                    <div className = "change-button" style={{ display: this.props.saveDisplay }}>
                        <button onClick={() => this.props.onClick(true)}>Zapisz listę</button>
                        <span>|</span>
                        <button onClick={() => this.props.onClick(false)}>Anuluj</button>
                    </div>
                </div>
                <div className="checklistEditor">
                    <div className={this.state.disabled} />
                    {this.state.isContentLoaded ? (
                        this.state.onlyToRead ? (
                            <TextReader value={this.state.initial} />
                        ) : (
                                <TextEditor value={this.state.initial} onSave={this.onSave} />
                            )
                    ) : (
                            <ClipLoader />
                        )}
                </div>
            </section>
        );
    }
}
