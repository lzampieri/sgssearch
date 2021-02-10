import React from 'react';
import ReactDOM from 'react-dom';
import { Box, createMuiTheme, CssBaseline, Paper, Link, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider, withSnackbar } from 'notistack';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
  });
  

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enigmas: [],
            selected: -1
        };
    }

    selectEnigma(num) {
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
                        <Paper style={{ width: "20%", height: "100%" }} variant="outlined">
                            <ul>
                                { this.state.enigmas.map( (e) =>
                                    <li><Link onClick={this.selectEnigma.bind(this,e.id)}> e.id </Link></li>
                                )}
                                <li><Link onClick={this.selectEnigma.bind(this,-1)}>New enigma</Link></li>
                            </ul>
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined">
                            {this.state.selected}
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined" />
                    </Box>
                </Box>

            </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

export default AdminPage;

if (document.getElementById('admin_page')) {
    ReactDOM.render(<AdminPage />, document.getElementById('admin_page'));
}
