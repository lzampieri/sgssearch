import React from 'react';
import { Box, CssBaseline, Paper, ThemeProvider, CircularProgress, Backdrop, withStyles } from '@material-ui/core';
import UserDetails from './UserDetails';
import ButtonsList from './ButtonsList';
import { SnackbarProvider } from 'notistack';
import EnigmaContent from './EnigmaContent';
import Chart from './Chart';
import theme from './theme';

const styles = theme => ({
    bigContainer: {
        height: "100vh",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        [ theme.breakpoints.down('sm')]: {
            height: "auto",
            alignContent: "normal",
        }
    },
    mainPanel: {
        width: "70%",
        maxHeight: "80%",
        flexWrap: "no-wrap",
        [ theme.breakpoints.down('sm')]: {
            width: "100%",
            maxHeight: "none",
            flexWrap: "wrap"
        }
    },
    parallelPaper: {
        width: "50%",
        maxHeight: "100%",
        [ theme.breakpoints.down('sm')]: {
            width: "100%",
            maxHeight: null
        }
    },
    footer: {
        width: "70%",
        maxHeight: "20%",
        [ theme.breakpoints.down('sm')]: {
            width: "100%"
        }
    }
})

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enigmas: [],
            user_details: null,
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
        $.get( 'web_api/details').done( res => { this.setState( { user_details: res } ); });
    }

    async showChart() {
        this.setState( {selected: -1} );
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Box className={ classes.bigContainer } display="flex" >
                    <Box display="flex" className={ classes.mainPanel } >
                        <Box m={1} p={1} className={ classes.parallelPaper } >
                            <Paper variant="outlined" style={{ height: "100%", overflow: 'auto'  }}>
                                <ButtonsList select={this.select.bind(this)} enigmas={this.state.enigmas} selected={this.state.selected} />
                            </Paper>
                        </Box>
                        <Box m={1} p={1} className={ classes.parallelPaper } >
                            <Paper variant="outlined" style={{ height: "100%" }}>
                            { this.state.selected == -1 ? (
                                <Chart />
                            ) : (
                                <EnigmaContent enigma={ this.state.enigmas[this.state.selected] } reload={ this.load.bind(this) }/>
                            ) }
                            </Paper>
                        </Box>
                    </Box>
                    <Box className={ classes.footer } px={2} color="text.disabled" >
                        <UserDetails details={ this.state.user_details } showChart={ this.showChart.bind(this) } />
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

export default withStyles(styles)(Home);
