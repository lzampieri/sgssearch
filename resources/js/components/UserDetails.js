import React from 'react';
import { Box, Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
  
class UserDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }  

    render() {
        if( !this.props.details ) return (
            <Skeleton style={{ width: "100%" }} animation="wave" />
        );
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
                        <Link href="admin" color="inherit">Admin</Link>  
                    }
                    { "  " }
                    <Link href="#" onClick={ this.props.showChart.bind(this) } color="inherit">Classifica</Link>
                    { "  " }
                    <Link href="logout" color="inherit">Logout</Link>
                </Box>
            </Box>
        );
    }
    
}

export default UserDetails;
