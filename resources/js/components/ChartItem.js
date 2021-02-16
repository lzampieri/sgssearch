import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
  
class ChartItem extends React.Component {

    constructor(props) {
        super(props);

        this.palette = this.props.theme.palette;
    }

    render() {
        return (
            <ListItem button>
                <ListItemAvatar>
                    <Avatar  style={ this.props.me ? { backgroundColor: this.palette.text.primary } : {} } >
                        <AccountCircle/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ this.props.user.name } />
                <ListItemSecondaryAction>{ this.props.user.total_points }</ListItemSecondaryAction>
            </ListItem>
        );
    }
    
}

export default withTheme(ChartItem);
