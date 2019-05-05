import { Component } from "react";
import { AtomicBlockUtils } from "draft-js";

export default class ImageSource extends Component {
  callback(src) 
  {
    const { editorState, entityType, onComplete } = this.props

    if (src) {
      const content = editorState.getCurrentContent()
      const contentWithEntity = content.createEntity(
        entityType.type,
        "IMMUTABLE",
        { src },
      )
      const entityKey = contentWithEntity.getLastCreatedEntityKey()
      const nextState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        " ",
      )

      onComplete(nextState)
    } else {
      onComplete(editorState)
    }
  }

  componentDidMount()
  {
    console.log(this.props);
    this.props.entityType.UIHandler(this.callback.bind(this));
  }

  render() {
    return null;
  }
}