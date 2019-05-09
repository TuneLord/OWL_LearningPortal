import React from "react";
import Icon from "react-icons-kit";
import { link } from "react-icons-kit/icomoon/link";

export default class LinkDecorator extends React.Component 
{
  render() 
  {
    const { entityKey, contentState, children } = this.props;
    const {src}  = contentState.getEntity(entityKey).getData()
    return (
      <a href={src} target="_blank" rel="noopener noreferrer" className="editor-link">
          <Icon icon={link} size={16} className="editor-link-icon"/>
          <span className="editor-link-text">{children}</span>
      </a>);
  }
}