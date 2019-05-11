import React from "react";


export default (Component) => class VideoBlock extends React.Component
{
    render()
    {
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
            style,
            ...elementProps
        } = otherProps;
        const { entity } = blockProps;
        const { src } = entity.getData();
        return(
            <div style={style} {...elementProps}>
                <Component 
                    blockProps={{ src }} 
                    className={className} 
                    theme={
                        { 
                            iframeContainer: `editor-video-container${ style.cursor === "default" ? "" : " editor-resize" }`, 
                            invalidVideoSrc: "",
                            iframe: "editor-video"
                        }} 
                    style={{ height: "100%" }}
                />
            </div>
        )
    }
}