import React from 'react';
import { Box, CssBaseline, ThemeProvider, withStyles, Typography, Button } from '@material-ui/core';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
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
        }
    },
})

class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box className={ classes.bigContainer } display="flex" >
                    <Box display="flex" className={ classes.mainPanel } flexDirection="column" alignItems="center" >
                        <Typography variant="h1">La rete di Carlotta</Typography>
                        È consigliato usare l'account istituzionale.
                        <Button href="login_google" variant="contained">Login</Button>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(WelcomePage);
