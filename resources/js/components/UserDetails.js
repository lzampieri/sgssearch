import React from 'react';
import { Box } from '@material-ui/core';
  
class UserDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }  

    render() {
        if( !this.props.details ) return "";
        return (
            <Box display="flex" width={1} color="inherit">
                <Box width={0.33}>
                    { this.props.details.name }
                </Box>
                <Box width={0.34} textAlign="center">
                    { this.props.details.total_points } punti
                </Box>
                <Box width={0.33} color="inherit" textAlign="right">
                    { this.props.details.admin == 1 && 
                        <a href="admin" color="inherit">Admin</a>  
                    }
                    <a href="logout" color="inherit">Logout</a>
                </Box>
            </Box>
        );
    }
    
}

export default UserDetails;
