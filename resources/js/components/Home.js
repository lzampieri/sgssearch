import React from 'react';
import ReactDOM from 'react-dom';
import { Box, createMuiTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import UserDetails from './UserDetails';
import EnigmasList from './EnigmasList';
import { SnackbarProvider, withSnackbar } from 'notistack';
import EnigmaPaper from './EnigmaPaper';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    //   primary: {
    //     main: purple[500],
    //   },
    //   secondary: {
    //     main: green[500],
    //   },
    //   background: {
    //       default: 
    //   }
    },
  });
  

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_enigmas: null,
            selected: -1
        };
    }

    sayHello(num) {
        this.setState( {selected: num });
    }

    componentDidMount() {
    }  

    render() {
        return (
            <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Box height="100vh" display="flex" justifyContent="center" alignContent="center" flexWrap="wrap">
                    <Box display="flex" style={{ width: "70%", maxHeight: "80%" }}>
                        <Box m={1} p={1} style={{ width: "50%", maxHeight: "100%" }}>
                            <Paper variant="outlined" style={{ height: "100%", overflow: 'auto'  }}>
                                <EnigmasList whenCalled={this.sayHello.bind(this)}  />
                            </Paper>
                        </Box>
                        <Box m={1} p={1} style={{ width: "50%", maxHeight: "100%" }}>
                            <Paper variant="outlined" style={{ height: "100%" }}>
                                <EnigmaPaper />
                            </Paper>
                        </Box>
                    </Box>
                    <Box style={{ width: "70%", maxHeight: "20%" }} px={2} color="text.disabled" >
                        <UserDetails />
                    </Box>
                </Box>

            </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
