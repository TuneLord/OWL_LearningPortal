import React from "react";
import { connect } from "react-redux";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createLinkPlugin from 'draft-js-anchor-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  SupButton,
  SubButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockRightButton,
  createInlineStyleButton
} from 'draft-js-buttons';


import "./rtfeditor.css"
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import "draft-js-anchor-plugin/lib/plugin.css"
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

// const BoldButton = createInlineStyleButton(
//     {
//     style: 'BOLD',
//     children: "BOLD",
//     }
// )

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
        this.linkPlugin = createLinkPlugin({ placeholder: "Wpisz adres i naciśnij ENTER.", linkTarget: "_blank"});
        this.inlineToolbarPlugin = createInlineToolbarPlugin();
        this.sideToolbarPlugin = createSideToolbarPlugin();
        this.linkifyPlugin = createLinkifyPlugin({ target: "_blank" });
        this.plugins = [ this.inlineToolbarPlugin , this.linkPlugin, this.linkifyPlugin, this.sideToolbarPlugin ];

        this.customStyleMap =
        {
            SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
            SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" }
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
        const { LinkButton } = this.linkPlugin;
        const { InlineToolbar } = this.inlineToolbarPlugin;
        const { SideToolbar } = this.sideToolbarPlugin;
        return(
            <div className="editor">
                <div className="editor-container-text">
                    <Editor 
                        editorState={this.state.editorState} 
                        onChange={this.onChange} 
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={this.plugins}
                        customStyleMap={this.customStyleMap}
                        // readOnly="true"
                    />
                    <SideToolbar>
                        {(externalProps) => (
                            <div>
                                <HeadlineOneButton {...externalProps} />
                                <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <AlignBlockCenterButton {...externalProps} />
                                <AlignBlockLeftButton {...externalProps} />
                                <AlignBlockRightButton {...externalProps} />
                            </div>
                        )}
                    </SideToolbar>
                    <InlineToolbar>
                        { (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <CodeButton {...externalProps} />
                                <SupButton {...externalProps} />
                                <SubButton {...externalProps} />
                                <LinkButton {...externalProps} />
                            </div>
                        )}
                    </InlineToolbar>
                </div>
            </div>
        );
    }
};

export default connect()(RTFEditor);