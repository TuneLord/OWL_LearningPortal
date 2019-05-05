import React from 'react';
import { connect } from 'react-redux';
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE } from "draftail";
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import Dialog from '@material-ui/core/Dialog';

import Icon from "react-icons-kit";
import {textColor} from 'react-icons-kit/icomoon/textColor';
import {bold} from 'react-icons-kit/icomoon/bold';
import {underline} from 'react-icons-kit/icomoon/underline';
import {italic} from 'react-icons-kit/icomoon/italic';
import {strikethrough} from 'react-icons-kit/icomoon/strikethrough';
import {superscript2 as superscript} from 'react-icons-kit/icomoon/superscript2';
import {subscript2 as subscript} from 'react-icons-kit/icomoon/subscript2';
import {embed2 as embed} from 'react-icons-kit/icomoon/embed2';
import {quotesRight} from 'react-icons-kit/icomoon/quotesRight';
import {list2 as list} from 'react-icons-kit/icomoon/list2';
import {listNumbered} from 'react-icons-kit/icomoon/listNumbered';
import {section} from 'react-icons-kit/icomoon/section';
import {quotesLeft} from 'react-icons-kit/icomoon/quotesLeft';
import {ic_keyboard_arrow_down as arrowDown} from 'react-icons-kit/md/ic_keyboard_arrow_down';
import {ic_format_paint as paint} from 'react-icons-kit/md/ic_format_paint';


import ColorPickerIcon from "../ColorPickerIcon/colorpickericon";
import ImageSource from "./sources/ImageSource";
import ImageBlock from "./ImageBlock";
import UserInputDialogContent from "../UserInputDialogContent/userInputDialogContent"

import "draft-js/dist/Draft.css";
import "./texteditor.css";


class TextEditor extends React.Component
{

    state = { textColor: "#000000", backgroundColor: "#fff", dialogOpen: false, callback: ""}

    // Initialization from sessionStorage. It will be changed to either from server or from storage.
    initial = JSON.parse(sessionStorage.getItem("draftail:content"))
    // Plugins extends editor
    plugins = [createLinkifyPlugin({ target: "_blank" })]
    // Definition of  "block type" buttons
    blockTypes = 
    [
        { type: BLOCK_TYPE.HEADER_ONE, description: "Nagłówek 1" },
        { type: BLOCK_TYPE.HEADER_TWO, description: "Nagłówek 2" },
        { type: BLOCK_TYPE.HEADER_THREE, description: "Nagłówek 3" },
        { type: BLOCK_TYPE.HEADER_FOUR, description: "Nagłówek 4" },
        { type: BLOCK_TYPE.HEADER_FIVE, description: "Nagłówek 5" },
        { 
            type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
            icon: <Icon icon={list} />,
            description: "Lista", 
        },
        { 
            type: BLOCK_TYPE.ORDERED_LIST_ITEM,
            icon: <Icon icon={listNumbered} />,
            description: "Lista numerowana", 
        },
        { 
            type: BLOCK_TYPE.BLOCKQUOTE,
            icon: <Icon icon={quotesLeft} />,
            description: "Blok cytatu", 
        },
        { type: BLOCK_TYPE.CODE, description: "Blok kodu" },
        { 
            type: BLOCK_TYPE.UNSTYLED,
            icon: <Icon icon={section} />,
            description: "Paragraf", 
        },
    ]
    // Definiton of "entity type" buttons
    // Autosaving callback. It should be improved to both saving in storage and in server.
    // It should handle "server down" case.
    onSave = (content) =>
    {
        sessionStorage.setItem("draftail:content", JSON.stringify(content))
    }
    // Function for updating and creating "inline type" buttons

    onDialogClose = () =>
    {
        this.setState({ dialogOpen: false });
    }

    createEntityStyles()
    {
        this.entityTypes=
        [
            { 
                type: ENTITY_TYPE.IMAGE,
                source: ImageSource,
                block: ImageBlock,
                UIHandler: this.onImageCreation.bind(this)
            },
            // { type: ENTITY_TYPE.IMAGE },
            // { type: ENTITY_TYPE.HORIZONTAL_RULE },
        ] 
    }
    createInlineStyles()
    {
        this.inlineStyles = 
        [
            { 
                type: INLINE_STYLE.BOLD,
                icon: <Icon icon={bold} />,
                description: "Pogrubienie",
            },
            { 
                type: INLINE_STYLE.ITALIC,
                icon: <Icon icon={italic} />,
                description: "Kursywa",
            },
            { 
                type: INLINE_STYLE.UNDERLINE,
                icon: <Icon icon={underline} />,
                description: "Podkreślenie",
            },
            { 
                type: INLINE_STYLE.STRIKETHROUGH,
                icon: <Icon icon={strikethrough}/>,
                description: "Przekreślenie",
            },
            {
                description: "Kolor tekstu",
                type: `color-${this.state.textColor}`,
                icon: (
                        <div>
                            <Icon icon={textColor} style={ {color: this.state.textColor}} />
                            <ColorPickerIcon 
                                icon={arrowDown}
                                onPickerChange={this.onColorTextPickerChange.bind(this)}
                                color={this.state.textColor}
                                colors={['#000000', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3', '#CCCCCC', '#FFFFFF', '#9F0500', '#D33115', '#F44E3B', '#C45100', '#E27300', '#FE9200', '#FB9E00', '#FCC400', '#FCDC00', '#808900', '#B0BC00', '#DBDF00', '#194D33', '#68BC00', '#A4DD00', '#0C797D', '#16A5A5', '#68CCCA', '#0062B1', '#009CE0', '#73D8FF', '#653294', '#7B64FF', '#AEA1FF', '#AB149E', '#FA28FF',  '#FDA1FF']}
                                width="210px"
                            />
                        </div>),
                style: 
                {
                    color: this.state.textColor
                }
            },
            {
                description: "Kolor tła",
                type: `backgroundColor-${this.state.textColor}`,
                icon: (
                        <div>
                            <Icon icon={paint} style={ {color: this.state.backgroundColor}} />
                            <ColorPickerIcon 
                                icon={arrowDown}
                                onPickerChange={this.onColorBackgroundPickerChange.bind(this)}
                                color={this.state.backgroundColor}
                                colors={['#000000', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3', '#CCCCCC', '#FFFFFF', '#9F0500', '#D33115', '#F44E3B', '#C45100', '#E27300', '#FE9200', '#FB9E00', '#FCC400', '#FCDC00', '#808900', '#B0BC00', '#DBDF00', '#194D33', '#68BC00', '#A4DD00', '#0C797D', '#16A5A5', '#68CCCA', '#0062B1', '#009CE0', '#73D8FF', '#653294', '#7B64FF', '#AEA1FF', '#AB149E', '#FA28FF',  '#FDA1FF']}
                                width="210px"
                            />
                        </div>),
                style: 
                {
                    backgroundColor: this.state.backgroundColor
                }
            },
            { 
                type: INLINE_STYLE.CODE,
                icon: <Icon icon={embed}/>,
                description: "Kod"
            },
            { 
                type: INLINE_STYLE.QUOTATION,
                icon: <Icon icon={quotesRight}/>,
                description: 'Cytat'
            },
            { 
                type: INLINE_STYLE.SUBSCRIPT,
                icon: <Icon icon={subscript}/>,
                description: "Indeks dolny"
            },
            { 
                type: INLINE_STYLE.SUPERSCRIPT,
                icon: <Icon icon={superscript}/>,
                description: "Indeks górny" 
            },
            { 
                type: INLINE_STYLE.KEYBOARD,
                description: "Skrót klawiszowy"
            },
            
        ]
    }

    // Callbacks used for changing buttons' colors
    onColorTextPickerChange(color, event)
    {
        event.preventDefault();
        this.setState({ textColor: color.hex });
    }
    
    onColorBackgroundPickerChange(color, event)
    {
        event.preventDefault();
        this.setState( { backgroundColor: color.hex})
    }

    onImageCreation(callback)
    {   
        this.setState({ callback, dialogOpen:true });
    }

    
    render()
    {
        this.createInlineStyles();
        this.createEntityStyles();
        console.log(this.state)
        return(
            <div>
                <DraftailEditor
                    rawContentState={this.initial || null}
                    onSave={this.onSave}
                    plugins={this.plugins}
                    blockTypes={this.blockTypes}
                    inlineStyles={this.inlineStyles}
                    entityTypes={this.entityTypes}
                />
                <Dialog open={this.state.dialogOpen}> 
                    <UserInputDialogContent 
                        title="Kreator obrazu"
                        inputId="input" 
                        type="text" 
                        placeholder="http://" 
                        label="Adres obrazu"
                        callback={this.state.callback}
                        onClose={this.onDialogClose}
                    />
                </Dialog>
            </div>
        )
    }
    
};  

export default connect()(TextEditor);