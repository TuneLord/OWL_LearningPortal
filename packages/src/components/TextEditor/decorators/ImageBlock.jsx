import React, { Component } from "react";
import unionClassNames from "union-class-names";

export default class ImageBlock extends Component {

  render() {
    const { block, className, theme, ...otherProps } = this.props;
    const {
      blockProps,
      customStyleMap,
      customStyleFn,
      decorator,
      forceSelection,
      offsetKey,
      selection,
      tree,
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;
    const { entity } = blockProps
    const { src, alt } = entity.getData()
    const newClassName = unionClassNames("editor-image-block", className)
    return <img {...elementProps} className={newClassName} src={src} alt={alt} width="256" />
  }
}