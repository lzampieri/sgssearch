import React from 'react';
import { Box } from '@material-ui/core';
  
class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_details: null,
            user_enigmas: null
        };
    }

    componentDidMount() {
        $.get( 'web_api/details').done( res => { this.setState( { user_details: res } ); });
    }  

    render() {
        if( !this.state.user_details ) return "";
        return (
            <Box display="flex" justifyContent="space-between" width={1} color="inherit">
                <span>
                    { this.state.user_details.name }
                </span>
                <span>
                    { this.state.user_details.total_points } punti
                </span>
                <span color="inherit">
                    <a href="logout" color="inherit">Logout</a>
                </span>
            </Box>
        );
    }
    
}

export default UserDetails;
