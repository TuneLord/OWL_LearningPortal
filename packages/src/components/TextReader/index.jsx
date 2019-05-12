import React from "react";
import TextEditor from "../TextEditor";

// Prop value is for TextReader visible content

export default ({readOnly, ...otherProps}) => 
{
    return <TextEditor {...otherProps} readOnly={true} />;
}