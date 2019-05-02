import "./rtfeditor.css"
import React from "react";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import { connect } from "react-redux";

class RTFEditor extends React.Component
{
    constructor(props)
    {
        super(props);
        const content = this.props.content || this._getContentFromStorage();
        this.state = 
        {
            editorState: content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
        }
    }

    onChange = (editorState) => 
    {
        this._setContentToStorage(editorState.getCurrentContent());
        this.setState({ editorState });
    } 
    handleKeyCommand = (command, editorState) =>
    {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) 
        {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    _getContentFromStorage = () => JSON.parse(sessionStorage.getItem("Editor'sContent"));

    _setContentToStorage = (content) => sessionStorage.setItem("Editor'sContent", JSON.stringify(convertToRaw(content)));

    render()
    {
        return(
            <div className="editor">
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    handleKeyCommand={this.handleKeyCommand} 
                />
            </div>
        );
    }
};

export default connect()(RTFEditor);