import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class UserInputDialogContent extends React.Component
{
    state = { value: "" , ready: false};

    componentDidMount()
    {
        // Component need to be mounted properly befory you can close it
        setTimeout(() => this.setState({ ready: true }), 200);
    }

    // This function run callback with typed value and closes dialog window 
    onButtonPointerUp = (e) =>
    {
        this.props.callback(this.state.value);
        this.props.onClose();
    }
    
    // This callback handles clicking out the window
    onClickAway = (e) =>
    {
        if(this.state.ready)
        {
            this.props.callback("");
            this.props.onClose();
        }
    }
    
    // Handling "return" key
    onKeyPress = (e) =>
    {
        if (e.charCode === 13)
        {
            this.props.callback(this.state.value);
            this.props.onClose();
        }
    }
    
    // For controlling input
    onTextFieldChange = (e) =>
    {
        this.setState( {value: e.target.value });
    }

    render()
    {

        return(
            <ClickAwayListener onClickAway={this.onClickAway}>
                <div onKeyPress={this.onKeyPress}>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            variant="outlined"
                            margin="normal"
                            id={this.props.inputId}
                            type={this.props.inputType}
                            placeholder={this.props.placeholder}
                            value={this.state.value}
                            label={this.props.label}
                            onChange={this.onTextFieldChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onPointerUp={this.onButtonPointerUp} color="primary" variant="contained">
                            Zatwierdź
                        </Button>
                    </DialogActions>
                </div>
            </ClickAwayListener>
        )
    }
}