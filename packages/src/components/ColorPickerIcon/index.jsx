import React from "react";
import Icon from "react-icons-kit"
import { BlockPicker } from 'react-color';
import Slide from '@material-ui/core/Slide';

import "./ColorPickerIcon.css";

export default class ColorPickerIcon extends React.Component
{
    
    state = { isOpened: false };

    componentDidMount()
    {
        window.addEventListener("mousedown", this.onBlur);
    }
    
    componentWillUnmount()
    {
        window.removeEventListener("mousedown", this.onBlur);
    }

    onIconMouseDown = event =>
    {
        event.preventDefault();
        event.stopPropagation();    // Prevents from toggling color styling
        this.setState({ isOpened: !this.state.isOpened});   // Showing and hiding color picker
    }

    onMouseDown = event =>
    {
        event.preventDefault();      // Prevents from toggling color styling
        event.stopPropagation();
    }
    // Function that hides color picker when user clicks somewhere else
    onBlur = event =>
    {
        if (this.state.isOpened) this.setState({ isOpened: false});
    }

    render()
    {
        if (this.props.width) document.documentElement.style.setProperty("--color-picker-width", `${this.props.width}`);
        return (
            <span className="editor-color-wrapper" onMouseDown={this.onMouseDown}>
                <Icon icon={this.props.icon} onMouseDown={this.onIconMouseDown} className={"editor-color-arrow"}/>
                <Slide in={this.state.isOpened}>
                    <BlockPicker
                        width={this.props.width}
                        className="editor-color-picker"
                        onChangeComplete={this.props.onPickerChange}
                        color={this.props.color}
                        colors={this.props.colors}
                        onSwatchHover={this.props.onSwatchHover}
                    />
                </Slide>
            </span>
        )
    }
}