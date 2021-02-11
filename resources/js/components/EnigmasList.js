import React from 'react';
import { Box } from '@material-ui/core';
import EnigmaButton from './EnigmaButton';
import { withSnackbar } from 'notistack';
  
class EnigmasList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Box p={2} display="flex" flexWrap="wrap">         
                { this.props.enigmas.map( (enigma) => {
                    return <EnigmaButton key={enigma.id} num={enigma.id} whenCalled={() => this.props.select(enigma.id)} active={ enigma.id == this.props.selected }/>;
                })}
                <EnigmaButton num={-1} />
            </Box>
        );
    }
    
}

export default withSnackbar(EnigmasList);
