import React from 'react';
import { List, ListItemText, ListItem } from '@material-ui/core';
import StatsItem from './StatsItem';
import { withSnackbar } from 'notistack';
  
class Stats extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if( !this.props.stats ) return "";
        var id_generator = 0;
        return (
            <List style={{ height: "100%", overflow: 'auto' }}>
                { Object.keys(this.props.stats).map( key =>
                    (
                    <StatsItem
                        key={ this.props.prefix * 1000 + ( ++id_generator ) }
                        prefix={ this.props.prefix * 1000 + ( ++id_generator ) }
                        name={ key }
                        list={ this.props.stats[key] } />
                ) ) }
            </List>
        );
    }
    
}

export default withSnackbar(Stats);
