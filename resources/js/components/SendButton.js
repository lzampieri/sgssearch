import React from 'react';
import { CircularProgress, Fab } from '@material-ui/core';
import { Clear, Send, Check, HourglassEmpty } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
  
class SendButton extends React.Component {

    constructor(props) {
        super(props);
        
        this.palette = this.props.theme.palette;
        this.send = () => this.props.onClick();
    }

    render() {
        this.fabIcon = { 0: <Send />, 1: <CircularProgress />, 2: <Check />, 3: <Clear />};
        this.fabBackgroundColor = { 0: this.palette.text.secondary, 1: this.palette.text.disable, 2: this.palette.success.main, 3: this.palette.error.main};
        if( this.props.solved ) this.fabBackgroundColor[0] = this.fabBackgroundColor[2];
        return (
            <Fab disabled={this.props.response == 1 } onClick={ this.send.bind(this) } style={{ backgroundColor: this.fabBackgroundColor[ this.props.response ] }}>
                { this.fabIcon[ this.props.response ] }
            </Fab>
        );
    }
    
}

export default withTheme(SendButton);
