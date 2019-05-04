import React from "react";
import Icon from "react-icons-kit"
import { BlockPicker } from 'react-color';

import "./colorpickericon.css";

export default class ColorPickerIcon extends React.Component
{
    state = { isOpened: false };

    onIconMouseDown = event =>
    {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ isOpened: !this.state.isOpened});
        console.log(event.target);
    }

    onMouseDown = event =>
    {
        event.stopPropagation();
    }

    render()
    {
        if (this.props.width) document.documentElement.style.setProperty("--color-picker-width", `${this.props.width}`);
        const colorPicker = (
            <BlockPicker
                width={this.props.width}
                className="editor-color-picker"
                onChangeComplete={this.props.onPickerChange}
                color={this.props.color}
                colors={this.props.colors}
                onSwatchHover={this.props.onSwatchHover}
                />);
        return (
            <span className="editor-color-wrapper" onMouseDown={this.onMouseDown}>
                <Icon icon={this.props.icon} onMouseDown={this.onIconMouseDown} />
                {this.state.isOpened ? colorPicker : ""}
            </span>
        )
    }
}