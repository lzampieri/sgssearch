import React from 'react';
import { Box } from '@material-ui/core';
import Enigma from './Enigma';
import { withSnackbar } from 'notistack';
  
class EnigmasList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_enigmas: [1, 2, 3, 4, 5, 6]
        };
    }

    whenCalled(num) {
        this.props.enqueueSnackbar("Clicked over " + num);
        this.props.whenCalled(num);
    }

    render() {
        return (
            <Box p={2} style={{ width: "100%"}} display="flex" flexWrap="wrap">         
                { this.state.user_enigmas.map( (enigma) => {
                    return <Enigma key={enigma} num={enigma} whenCalled={this.whenCalled.bind(this)} />;
                })}
                <Enigma num={-1} />
            </Box>
        );
    }
    
}

export default withSnackbar(EnigmasList);
