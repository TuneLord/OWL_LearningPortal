import React, { Component } from 'react';
import './checklistEditorContainer.css';
import TextEditor from '../TextEditor/index';

export default class ChecklistEditorContainer extends Component {
    // constructor(props){
    // super(props)
    // }
    render() {
        return (
            <section className="checklistEditor__container">
                <div className="checklist__header">
                    <h3>Edytor listy</h3>
                </div>
                <div className="checklistEditor">
                    {/* <div className='textEditor'> */}
                    <TextEditor />
                    {/* </div> */}
                </div>
            </section>

        );
    };
};