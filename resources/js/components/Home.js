import React from 'react';
import ReactDOM from 'react-dom';
import { Box, createMuiTheme, CssBaseline, Paper, ThemeProvider, CircularProgress, Backdrop } from '@material-ui/core';
import UserDetails from './UserDetails';
import EnigmasList from './EnigmasList';
import { SnackbarProvider, withSnackbar } from 'notistack';
import EnigmaPaper from './EnigmaPaper';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
  });
  

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enigmas: [],
            selected: -1,
            loading: true
        };
    }

    select(id) {
        this.setState( {selected: id });
    }

    componentDidMount() {
        this.load();
    }  

    async load() {
        this.setState( {loading: true});
        $.get('web_api/enigmas', (data) => {
            var ordered_enigmas = [];
            data.map( (e) => ordered_enigmas[e.id] = e );
            this.setState( { enigmas: ordered_enigmas, loading: false });
        });
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
                                <EnigmasList select={this.select.bind(this)} enigmas={this.state.enigmas} selected={this.state.selected} />
                            </Paper>
                        </Box>
                        <Box m={1} p={1} style={{ width: "50%", maxHeight: "100%" }}>
                            <Paper variant="outlined" style={{ height: "100%" }}>
                                <EnigmaPaper enigma={ this.state.enigmas[this.state.selected] }/>
                            </Paper>
                        </Box>
                    </Box>
                    <Box style={{ width: "70%", maxHeight: "20%" }} px={2} color="text.disabled" >
                        <UserDetails />
                    </Box>
                </Box>
                <Backdrop open={this.state.loading} style={{ zIndex: 1500 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}
