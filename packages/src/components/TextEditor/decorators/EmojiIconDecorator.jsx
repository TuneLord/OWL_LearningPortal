import React, { createRef } from "react";

export default class EmojiIconDecorator extends React.Component
{
    ref = createRef();

    componentDidMount()
    {
        this.ref.current.parentElement.onmousedown = this.onMouseDown;
        // console.log(this.ref.current.children[0].children[0])
        // replaceElement(this.ref.current.children[0].children[0], "div");
        // console.log(this.ref.current.children[0].children[0]);
    }
    onMouseDown = (e) =>
    {
        e.stopPropagation();
        e.preventDefault();
    }
    render()
    {
        return(
            <div ref={this.ref} onMouseDown={this.onMouseDown}>
                {this.props.children}
            </div>
        )
    }
}