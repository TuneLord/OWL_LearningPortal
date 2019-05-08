import React from "react";
import Icon from "react-icons-kit";
import { link } from "react-icons-kit/icomoon/link";

export default class LinkifyDecorator extends React.Component 
{
  render() 
  {
    const { href, target, className } = this.props;
    return (
      <a href={href} target={target} rel="noopener noreferrer" className="editor-link">
          <Icon icon={link} size={16} className="editor-link-icon"/>
          <a {...this.props} className="editor-link-text editor-link" />
      </a>);
  }
}