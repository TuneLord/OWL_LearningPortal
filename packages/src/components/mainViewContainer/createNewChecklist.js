import React, { Component } from 'react';
import './createNewChecklist.css';

export class CreateNewChecklistButton extends Component {

    render() {
        return (
            <div className="state createNewChecklist"
                onClick={this.props.onClick}
            >
                <p>Utwórz nową listę</p>
            </div>
        )
    };
};
