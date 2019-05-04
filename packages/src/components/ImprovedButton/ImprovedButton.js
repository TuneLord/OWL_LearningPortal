import React from "react"

export default class ImprovedButton extends React.Component
{
    render()
    {
        return(
            <button 
                {...this.props}  
                onPointerDown={(e)=>
                {
                    e.preventDefault();
                    this.props.onPointerDown(e);
                }}
            >
                {this.props.children}
            </button>
        );
    }
}