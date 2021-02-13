import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { AccountCircle } from '@material-ui/icons';
  
class ChartItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <AccountCircle />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ this.props.user.name } />
                <ListItemSecondaryAction>{ this.props.user.total_points }</ListItemSecondaryAction>
            </ListItem>
        );
    }
    
}

export default withSnackbar(ChartItem);
