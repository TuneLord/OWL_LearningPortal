import React from "react";

export default (Component) => class EmojiIconDecorator extends React.Component
{
    onClick = (e) =>
    {
        e.stopPropagation();
    }
    render()
    {
        return(
            <div onClick={this.onClick}>
                <Component />
            </div>
        )
    }
}