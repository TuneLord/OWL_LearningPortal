import React from "react"
import TextEditor from "../TextEditor"
import TextReader from "../TextReader"
import { ClipLoader } from 'react-spinners';

export default class TextEditorContainer extends React.Component
{
    state= { isContentLoaded: false, initial: "" }

    componentDidMount()
    {
        setTimeout(() => 
            {
                this.setState(
                    { 
                        initial: JSON.parse(sessionStorage.getItem("draftail:content")), 
                        isContentLoaded: true 
                    }
                );
            }, 0);
    }

    onSave = (content) =>
    {
        sessionStorage.setItem("draftail:content", JSON.stringify(content))
    }

    _createRender()
    {
        if (this.state.isContentLoaded)
        {
            return (
                // <TextEditor
                //     value={this.state.initial}
                //     onSave={this.onSave}
                //     // readOnly={true}
                // />
                <TextReader value={this.state.initial} />
            );
        }
        else
        {
            return <ClipLoader /> ;
        }
    }

    render()
    {
        return (
            <div className="editor-container">
                {this._createRender()}
            </div>
        );
    }
}