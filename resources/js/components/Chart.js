import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ChartItem from './ChartItem';
import { withSnackbar } from 'notistack';
  
class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chart: []
        };
    }
    
    componentDidMount() {
        this.load();
    }

    componentWillUnmount() {
        if( this.timeout ) clearTimeout( this.timeout );
    }

    async load() {
        if( this.timeout ) clearTimeout( this.timeout );
        await $.get( 'web_api/chart', (data) => {
            function compare(a,b) { return b.total_points - a.total_points };
            data = data.sort( compare );
            this.setState( {chart: data } ); 
        }).promise();
        this.timeout = setTimeout( this.load.bind(this) , 5000 );
    }

    render() {
        return (
            <Box p={2} display="flex" flexDirection="column" style={{ height: "100%", overflow: 'auto' }}>
                <Typography variant="h5">Classifica</Typography>
                <List dense={true}>
                    { this.state.chart.map( (e) =>
                        <ChartItem key={ e.id } user={e} />
                    )}
                </List>
                { this.state.chart.length == 0 && (
                    <Box display="flex" flexDirection="column">
                        <Skeleton animation="wave" variant="circle" width={50} height={50} />
                        <Skeleton animation="wave" variant="circle" width={50} height={50} />
                        <Skeleton animation="wave" variant="circle" width={50} height={50} />
                    </Box>
                )}
            </Box>
        );
    }
    
}

export default withSnackbar(Chart);
