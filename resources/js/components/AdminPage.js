import React from 'react';
import { Box, CssBaseline, Paper, List, ListItem, ThemeProvider,   ListItemText, Backdrop, CircularProgress, Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import EditEnigma from './EditEnigma';
import EditSolutions from './EditSolutions';
import Stats from './Stats';
import UploadFile from './UploadFile';
import theme from './theme';  

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enigmas: [],
            selected: -1,
            stats: false,
            loading: true,
            stats_by_user: {},
            stats_by_value: {}
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

    async loadStats() {
        this.setState( { loading: true } );
        var by_user = {};
        var by_value = {};
        await $.get( 'web_api/all_responses', (data) => {
            data.map( item => {
                var name = item.user.name.toLowerCase();
                var value = item.value.toLowerCase();
                var enigma_id = item.enigma_id;
                if( !by_user[ enigma_id ] ) by_user[ enigma_id ] = {};
                if( !by_value[ enigma_id ] ) by_value[ enigma_id ] = {};
                if( !by_user[ enigma_id ][ name ] ) by_user[ enigma_id ][ name ] = [];
                if( !by_value[ enigma_id ][ value ] ) by_value[ enigma_id ][ value ] = [];
                by_user[ enigma_id ][ name ].push(value);
                by_value[ enigma_id ][ value ].push(name);
            })
        }).promise();
        this.setState({ stats_by_user: by_user, stats_by_value: by_value });
        this.setState( { loading: false } );
    }

    showStats() {
        this.setState( { stats: true } );
        this.loadStats();
    }

    hideStats() {
        this.setState( { stats: false } );
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Box height="100vh" display="flex" justifyContent="center" alignContent="center" flexWrap="wrap">
                    <Box display="flex" style={{ width: "90%", height: "80%" }}>
                        <Paper style={{ width: "20%", height: "100%", overflow: 'auto' }} variant="outlined">
                            <Box display="flex" justifyContent="center">
                                <Button variant={ this.state.stats ? "outlined" : "contained" } onClick={ this.hideStats.bind(this) }>Modifica</Button>
                                <Button variant={ this.state.stats ? "contained" : "outlined" } onClick={ this.showStats.bind(this) }>Statistiche</Button>
                            </Box>
                            <List dense={true}>
                                { this.state.enigmas.map( (e) =>
                                    <ListItem button selected={ e.id == this.state.selected } key={ e.id } onClick={this.selectEnigma.bind(this,e.id)}><ListItemText primary={ e.id } /></ListItem>
                                )}
                                <ListItem button selected={ -1 == this.state.selected } onClick={this.selectEnigma.bind(this,-1)}><ListItemText primary="New enigma" /></ListItem>
                            </List>
                            <Box style={{ width: "100%" }}>
                                <UploadFile style={{ width: "100%" }} />
                            </Box>
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined">
                            { this.state.stats ? (
                                <Stats stats={ this.state.stats_by_user[ this.state.selected ] } />
                            ) : (
                                <EditEnigma enigmaId={ this.state.selected } values={ this.state.enigmas[this.state.selected] } reload={this.reload.bind(this)} />
                            ) }
                        </Paper>
                        <Paper style={{ width: "40%", height: "100%" }} variant="outlined">
                            { this.state.stats ? (
                                <Stats stats={ this.state.stats_by_value[ this.state.selected ] } />
                            ) : (
                                <EditSolutions enigmaId={ this.state.selected } values={ this.state.enigmas[this.state.selected] } reload={this.reload.bind(this)} />
                            ) }
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