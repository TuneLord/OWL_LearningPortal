import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class UserInputDialogContent extends React.Component
{
    state = { value: "" };

    onButtonPointerUp = (e) =>
    {
        this.props.callback(this.state.value);
        this.props.onClose();
    }

    onTextFieldChange = (e) =>
    {
        this.setState( {value: e.target.value });
    }

    onClickAway = (e) =>
    {
        // this.props.callback("");
        // this.props.onClose();
    }

    render()
    {

        return(
            <ClickAwayListener onClickAway={this.onClickAway}>
                <div>
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