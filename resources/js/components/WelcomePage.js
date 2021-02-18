import React from 'react';
import { Box, CssBaseline, ThemeProvider, withStyles, Typography, Button } from '@material-ui/core';
import theme from './theme';

const styles = theme => ({
    bigContainer: {
        height: "100vh",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap"
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
    introImage: {
        width: "30%",
        [ theme.breakpoints.down('sm')]: {
            width: "40%"
        },
        [ theme.breakpoints.down('xs')]: {
            width: "70%"
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
                        <img src='storage/logo_h.svg' className={ classes.introImage } />
                        <Typography variant="h1">Spoons</Typography>
                        È consigliato usare l'account istituzionale.
                        <Button href="login_google" variant="contained">Login</Button>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(WelcomePage);
