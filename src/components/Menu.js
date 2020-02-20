import React, {useState} from 'react';
import {fade,  makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontStyle: 'normal',
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            marginRight: '20px'
        }
    },
    search: {
        position: 'relative',
          borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    btn: {
        fontWeight: 'bold'
    }
}));

const Menu = ({query, handleQuery}) => {
    const classes = useStyles();
    const [urlPath] = useState(window.location.pathname.length);
    const [btncopy, setBtncopy] = useState('Share');
    const copy = (event) => {
        setBtncopy('Copied!');
        setTimeout(function(){
            setBtncopy('Share')
        }, 3000); 
    }
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.title} href="/">
                            Leszek Korzan Blog
                        </Link>
                    </Typography>
                    {urlPath < 5 ? (
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={query}
                                onChange={handleQuery}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    ) : (
                        <CopyToClipboard text={window.location.href}>
                            <Button onClick={copy} color="inherit" className={classes.btn}>{btncopy}</Button>
                        </CopyToClipboard>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Menu;