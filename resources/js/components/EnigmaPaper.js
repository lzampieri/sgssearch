import React from 'react';
import { Box, TextField } from '@material-ui/core';
import EnigmaButton from './EnigmaButton';
import SendButton from './SendButton';
  
class EnigmaPaper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: 0  // 0: Nothing, 1: Loading, 2: Success, 3: Failed
        };
    }
    
    load() {
        var newres = ( this.state.response + 1 ) % 4;
        this.setState( { response: newres });
        if( newres == 0 ) return;
        setTimeout( this.load.bind(this), 1000 );
    }

    handleKeyPress = (e) => {
        if( e.key == 'Enter' ) {
            this.load();
        }
    }

    render() {
        return (
            <Box p={2} display="flex" flexDirection="column" style={{ height: "100%" }}>
                <Box flexGrow={1} style={{ overflow: "auto "}}>
                    { this.props.enigma && this.props.enigma.text }
                </Box>
                <Box pt={2} display="flex" flexDirection="row">
                    <Box flexGrow={1}>
                        <TextField label="Rispondi..." style={{ width: "100%" }} onKeyPress={ this.handleKeyPress.bind(this) }/>
                    </Box>
                    <SendButton response={this.state.response} onClick={ (e) => this.load.bind(this) } />
                </Box>
            </Box>
        );
    }
    
}

export default EnigmaPaper;
