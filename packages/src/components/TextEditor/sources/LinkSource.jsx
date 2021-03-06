import React from "react";
import { Modifier, EditorState } from "draft-js";


// This source component is used to creating link entity. Read draft.js documentation or ask 
// me to understand what is going on below
export default class ImageSource extends React.Component 
{
  callback(src) 
  {
    const { editorState, entityType, onComplete } = this.props;
    if (src) 
    {
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity(
        entityType.type,
        "MUTABLE",
        { src },
        );
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      const contentWithLink = Modifier.applyEntity(
        contentWithEntity,
        editorState.getSelection(),
        entityKey,
      );
      const nextState = EditorState.push(editorState, contentWithLink);
      onComplete(nextState);
    } 
    else onComplete(editorState);
  }

  componentDidMount()
  {
    this.props.entityType.UIHandler(this.callback.bind(this));
  }

  render() 
  {
    return null;
  }
}