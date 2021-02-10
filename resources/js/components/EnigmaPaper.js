import React from 'react';
import { Box, TextField } from '@material-ui/core';
import EnigmaButton from './EnigmaButton';
import SendButton from './SendButton';
  
class EnigmaPaper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: 0  // 0: Nothing, 1: Loading, 2: Success, 3: Failed
        };
    }
    
    load() {
        var newres = ( this.state.response + 1 ) % 4;
        this.setState( { response: newres });
        if( newres == 0 ) return;
        setTimeout( this.load.bind(this), 1000 );
    }

    handleKeyPress = (e) => {
        if( e.key == 'Enter' ) {
            this.load();
        }
    }

    render() {
        return (
            <Box p={2} display="flex" flexDirection="column" style={{ height: "100%" }}>
                <Box flexGrow={1} style={{ overflow: "auto "}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non turpis nec mi malesuada suscipit quis iaculis magna. Quisque sagittis viverra nisl, a tempus odio iaculis at. Praesent vitae lectus ac tortor consequat hendrerit a in enim. Nullam vel sodales tellus, in fringilla neque. Duis in justo turpis. Aenean auctor quis nunc ultricies efficitur. Sed a commodo erat. Vivamus commodo enim sit amet neque placerat suscipit. Phasellus malesuada tempus accumsan. Mauris egestas libero ut eros mollis, in scelerisque ex feugiat. Vestibulum gravida mauris ipsum, eget posuere odio convallis eu. Mauris nulla mi, rutrum vel dui ut, vestibulum ornare mauris. Mauris ut lorem a ipsum mollis accumsan. Etiam in libero eget ex bibendum sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in quam nisl. In hac habitasse platea dictumst. Fusce maximus, libero ut molestie vulputate, arcu purus cursus quam, a rhoncus orci lectus vitae massa. In feugiat ultricies erat, eget varius risus euismod nec. Phasellus dictum odio ut fringilla condimentum. Etiam nec ex mauris. Integer nulla nisl, commodo eget elementum dapibus, maximus ac nunc. Quisque et elit sodales, fringilla enim eget, cursus tellus. Nullam a eros id ligula commodo viverra ut eget orci. Donec suscipit rutrum tortor vel hendrerit. Fusce viverra maximus turpis, lobortis laoreet arcu tempus et. Vestibulum commodo in sapien eget tincidunt. Pellentesque risus risus, feugiat commodo ipsum faucibus, luctus gravida magna.
                </Box>
                <Box pt={2} display="flex" flexDirection="row">
                    <Box flexGrow={1}>
                        <TextField label="Rispondi..." style={{ width: "100%" }} onKeyPress={ this.handleKeyPress.bind(this) }/>
                    </Box>
                    <SendButton response={this.state.response} onClick={ (e) => this.load.bind(this) } />
                </Box>
            </Box>
        );
    }
    
}

export default EnigmaPaper;
