import React from 'react';
import { Box } from '@material-ui/core';
import EnigmaButton from './EnigmaButton';
import { withSnackbar } from 'notistack';
  
class EnigmasList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_enigmas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        };
    }

    whenCalled(num) {
        this.props.enqueueSnackbar("Clicked over " + num);
        this.props.whenCalled(num);
    }

    render() {
        return (
            <Box p={2} display="flex" flexWrap="wrap">         
                { this.state.user_enigmas.map( (enigma) => {
                    return <EnigmaButton key={enigma} num={enigma} whenCalled={this.whenCalled.bind(this)} />;
                })}
                <EnigmaButton num={-1} />
            </Box>
        );
    }
    
}

export default withSnackbar(EnigmasList);
