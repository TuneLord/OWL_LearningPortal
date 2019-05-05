import React, { Component } from "react"

export default class ImageBlock extends Component {
  render() {
    const { blockProps } = this.props
    const { entity } = blockProps
    const { src, alt } = entity.getData()

    return <img className="ImageBlock" src={src} alt={alt} width="256" />
  }
}