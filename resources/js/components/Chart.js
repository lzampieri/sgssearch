import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
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

    async load() {
        if( this.timeout ) clearTimeout( this.timeout );
        var data = await $.get( 'web_api/chart', (data) => {
            function compare(a,b) { return b.total_points - a.total_points };
            data = data.sort( compare );
            this.setState( {chart: data } ); 
        }).promise();
        setTimeout( this.load.bind(this) , 5000 );
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
            </Box>
        );
    }
    
}

export default withSnackbar(Chart);
