import React, { Component } from 'react';

export class CreateNewChecklistButton extends Component {

    render() {
        return (
            <button className="state state-button createNewChecklist" onClick={this.props.onClick}>
                Utwórz nową listę
            </button>
        )
    };
};
