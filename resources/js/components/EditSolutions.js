import React from 'react';
import { withSnackbar } from 'notistack';
import EditSolution from './EditSolution'; 
import { Box } from '@material-ui/core';

class EditSolutions extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        if( this.props.enigmaId == -1 )
            return "";
        return (
            <Box style={{ overflow: 'auto', height: "100%" }}>
                { this.props.values.solutions && this.props.values.solutions.map( (s) => (
                        <EditSolution key={s.id} values={s} enigmaId={this.props.enigmaId} reload={this.props.reload.bind(this)} />
                ) ) }
                <EditSolution enigmaId={this.props.enigmaId} reload={this.props.reload.bind(this)} />
            </Box>
        );
    }
}

export default withSnackbar(EditSolutions);