import React from 'react';
import { Box, List, ListItemText, ListItem, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
  
class StatsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClick() {
        this.setState( { open: !this.state.open } );
    }    

    render() {
        var id_generator = 0;
        return (
            <Box>
            <ListItem button onClick={ this.handleClick.bind(this) }>
                <ListItemText primary={ this.props.name } secondary={ this.props.list.length } />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto">
                <Box pl={3}>
                <List>
                    { this.props.list.map( item => (
                        <ListItem key={ this.props.prefix * 1000 + ( ++id_generator ) } >
                            <ListItemText primary={ item } />
                        </ListItem>
                    ))}
                </List>
                </Box>
            </Collapse>
            </Box>
        );
    }
    
}

export default withSnackbar(StatsItem);
