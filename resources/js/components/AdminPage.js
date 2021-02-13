import React from 'react';
import ReactDOM from 'react-dom';
import { Box, createMuiTheme, CssBaseline, Paper, List, ListItem, ThemeProvider, ListItemText, Backdrop, CircularProgress } from '@material-ui/core';
import { SnackbarProvider, withSnackbar } from 'notistack';
import EditEnigma from './EditEnigma';
import EditSolutions from './EditSolutions';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
  });
  

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enigmas: [],
            selected: -1,
            loading: true
        };
    }

    selectEnigma(num) {
        this.setState( {selected: num });
    }

    componentDidMount() {
        this.reload();
    }

    async reload() {
        this.setState( { loading: true } );
        await $.get( 'web_api/all_enigmas', data => {
            var ordered_enigmas = [];
            data.map( (e) => ordered_enigmas[e.id] = e ); 
            this.setState({ enigmas: ordered_enigmas }) 
        }).promise();
        this.setState( { loading: false } );
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Box height="100vh" display="flex" justifyContent="center" alignContent="center" flexWrap="wrap">
                    <Box display="flex" style={{ width: "90%", height: "80%" }}>
                        <Paper style={{ width: "20%", height: "100%", overflow: 'auto' }} variant="outlined">
                            <List dense={true}>
                                { this.state.enigmas.map( (e) =>
                                    <ListItem button selected={ e.id == this.state.selected } key={ e.id } onClick={this.selectEnigma.bind(this,e.id)}><ListItemText primary={ e.id } /></ListItem>
                                )}
                                <ListItem button selected={ -1 == this.state.selected } onClick={this.selectEnigma.bind(this,-1)}><ListItemText primary="New enigma" /></ListItem>
                            </List>
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined">
                            <EditEnigma enigmaId={ this.state.selected } values={ this.state.enigmas[this.state.selected] } reload={this.reload.bind(this)} />
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined">
                            <EditSolutions enigmaId={ this.state.selected } values={ this.state.enigmas[this.state.selected] } reload={this.reload.bind(this)} />
                        </Paper>
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

export default AdminPage;

if (document.getElementById('admin_page')) {
    ReactDOM.render(<AdminPage />, document.getElementById('admin_page'));
}
