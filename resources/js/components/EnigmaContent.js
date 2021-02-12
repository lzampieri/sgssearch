import React from 'react';
import { Box, TextField } from '@material-ui/core';
import EnigmaButton from './EnigmaButton';
import SendButton from './SendButton';
import { withSnackbar } from 'notistack';
  
class EnigmaContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: 0  // 0: Nothing, 1: Loading, 2: Success, 3: Failed
        };
        this.input = React.createRef();
    }
    
    async checkSolution() {
        if( this.state.response > 0 ) return;
        this.setState( {response: 1} );
        var data = await $.post( 'web_api/check_solution', { enigma_id: this.props.enigma.id, proposal: this.input.current.value } );
        if( data.id != -1 && data.valid > 0 ) {
            this.setState( {response: 2} );
            this.props.reload();
        } else {
            this.setState( {response: 3} );
        }
        if( data.hint )
            this.props.enqueueSnackbar( data.hint );
        setTimeout( this.resetState.bind(this), 2000 );
    }

    resetState() {
        this.setState( {response: 0} );
    }

    handleKeyPress = (e) => {
        if( e.key == 'Enter' ) {
            this.checkSolution();
        }
    }

    render() {
        if( !this.props.enigma ) return "";
        return (
            <Box p={2} display="flex" flexDirection="column" style={{ height: "100%" }}>
                <Box flexGrow={1} style={{ overflow: "auto "}}>
                    {  this.props.enigma.text }
                </Box>
                <Box pt={2} display="flex" flexDirection="row">
                    <Box flexGrow={1}>
                        <TextField label="Rispondi..." style={{ width: "100%" }} onKeyPress={ this.handleKeyPress.bind(this) } inputRef={ this.input }/>
                    </Box>
                    <SendButton response={ this.state.response } onClick={ this.checkSolution.bind(this) } solved={ this.props.enigma.solved } />
                </Box>
            </Box>
        );
    }
    
}

export default withSnackbar(EnigmaContent);
