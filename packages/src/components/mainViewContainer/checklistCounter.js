import React from 'react';
import './checklistCounter.css';

export class ChecklistCounter extends React.Component {
    state = {
        number: 0
    }

    async componentDidMount() {
        const requestHeaders = {
            'Content-Type': "application/json",
            "x-auth-token": localStorage.getItem("x-auth-token")
        };
        try {
            let response = await fetch(`/user`, {
                method: 'get',
                headers: requestHeaders,
            })
            response = await response.json()
            this.setState({
                number: response.checkLists.length
            })
        } catch (err) {
            alert("Nie udało się połączyć z serwerem!");
            console.log(err);
            return
        }
    };

    async componentDidUpdate(prevProps) {
        if (this.props.updateNumber !== prevProps.updateNumber) {
            const requestHeaders = {
                'Content-Type': "application/json",
                "x-auth-token": localStorage.getItem("x-auth-token")
            };
            try {
                let response = await fetch(`/user`, {
                    method: 'get',
                    headers: requestHeaders,
                })
                response = await response.json()
                this.setState({
                    number: response.checkLists.length
                })
            } catch (err) {
                alert("Nie udało się połączyć z serwerem!");
                console.log(err);
                return
            }
        }
    }

    render() {
        return (
            <div className="state checklistCounter">
                <span className="checklistNumber">{this.state.number}</span>
                <p>Liczba twoich checklist</p>
            </div>
        )
    }
};