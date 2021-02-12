import React from 'react';
import { Box, Button } from '@material-ui/core';
  
class EnigmaButton extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $.get( 'web_api/details').done( res => { this.setState( { user_details: res } ); });
    }

    whenCalled(num) {
        this.props.whenCalled(num);
    }

    render() {
        var style = {};
        if( this.props.solved && !this.props.active ) style.backgroundColor = "green";
        return (
            <Box style={{ width: "25%" }} p={2} onClick={this.whenCalled.bind(this,this.props.num)}>
                <Button variant={ this.props.active || this.props.solved ? "contained" : "outlined" } disabled={ this.props.num < 0 } style={ style }>
                    { this.props.num < 0 ? "..." : this.props.num }
                </Button>
            </Box>
        );
    }
    
}

export default EnigmaButton;