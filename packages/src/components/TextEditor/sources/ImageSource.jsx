import React from "react";
import { AtomicBlockUtils } from "draft-js";

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
        "IMMUTABLE",
        { src },
      );
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      const nextState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        " ",
      );

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