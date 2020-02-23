import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    error: {
        color: '#f44336'
    },
    success: {
        color: '#4caf50',
        fontWeight: 'bold'
    }
}))

const Newsletter = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inptError, setInptError] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
        setIsLoading(false);
        setInptError(false);
        setValue('');
        setError('');
        setSuccessMessage('');
    };
    const handleSend = () => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex.test(value.toLowerCase())){
            setError('');
            setSuccessMessage('');
            setInptError(false);
            setIsLoading(true);
            const url = "https://us-central1-leszekkeu.cloudfunctions.net/newsletteradd";
            const params = {
                email: value.toLowerCase(),
            };
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                if(res.success === true){
                    setIsLoading(false);
                    setError('');
                    setSuccessMessage('Success!');
                    
                }else{
                    setError('Error!');
                    setIsLoading(false);
                    setSuccessMessage('');
                }
            })
            .catch(() => {
                setError('Server Error!')
            });
        }else{
            setInptError(true);
        }
    }
    return(
        <React.Fragment>
            <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleClickOpen}
                >
                <MailIcon className={classes.extendedIcon} />
                Newsletter
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {isLoading ? (
                   <LinearProgress /> 
                ) : null}
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        error={inptError}
                        disabled={isLoading}
                    />
                    <p className={classes.error}>{error}</p>
                    <p className={classes.success}>{successMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSend} color="primary" disabled={isLoading}>
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
export default Newsletter;