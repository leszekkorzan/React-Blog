import React from 'react';
import '../App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Posts from '../components/Posts';
import Newsletter from '../components/Newsletter';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        marginTop: 50,
    },
    fab: {
        position: 'fixed',
        bottom: '10px',
        right: '10px'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}))
const Home = ({query}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Box display='flex' flexDirection='row' flexWrap='wrap' justifyContent='space-around' alignItems='center'>
                    <Posts query={query}/>
                </Box>
            </Container>

            <Newsletter/>
        </React.Fragment>
    )
}

export default Home;