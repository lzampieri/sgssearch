import React from 'react';
import { Box, TextField, Link, Typography } from '@material-ui/core';
import SendButton from './SendButton';
import { withSnackbar } from 'notistack';
import processString from 'react-process-string';
import ReactAudioPlayer from 'react-audio-player';
  
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
        if( this.input.current.value.length < 1 ) return;
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
        this.input.current.value = "";
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

    regex = [ {
        regex: /\[img (.*)\]/gi,
        fn: (key, result) => <img
                src={ 'storage/uploads/' + result[1] }
                style={{ maxWidth: "100%", maxHeigth: "100%" }}
                />
    }, {
        regex: /\[link ([^|]*)\|([^|]*)\]/gi,
        fn: (key, result) => <Link
                href={ result[2] }
                >
                    { result[1] }
                </Link>
    }, {
        regex: /\[file ([^|]*)\|([^|]*)\]/gi,
        fn: (key, result) => <Link color="inherit"
                href={ 'storage/uploads/' + result[2] }
                >
                    { result[1] }
                </Link>
    },{
        regex: /\[audio (.*)\]/gi,
        fn: (key, result) => <ReactAudioPlayer
                src={ 'storage/uploads/' + result[1] }
                style={{ width: "100%" }}
                controls
                />
    }, {
        regex: /#([^|]*)#/gi,
        fn: (key, result) => <Typography variant="h4"
                >
                    { result[1] }
                </Typography>
    }, {
        regex: /\n/gi,
        fn: (key, result) => <br/>
    }];

    render() {
        if( !this.props.enigma ) return "";
        return (
            <Box p={2} display="flex" flexDirection="column" style={{ height: "100%" }}>
                <Box flexGrow={1} style={{ overflow: "auto "}}>
                    { processString( this.regex )(this.props.enigma.text) }
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
