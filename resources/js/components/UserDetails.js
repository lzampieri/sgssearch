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
            <Box display="flex" width={1} color="inherit">
                <Box width={0.33}>
                    { this.state.user_details.name }
                </Box>
                <Box width={0.34} textAlign="center">
                    { this.state.user_details.total_points } punti
                </Box>
                <Box width={0.33} color="inherit" textAlign="right">
                    { this.state.user_details.admin == 1 && 
                        <a href="admin" color="inherit">Admin</a>  
                    }
                    <a href="logout" color="inherit">Logout</a>
                </Box>
            </Box>
        );
    }
    
}

export default UserDetails;
