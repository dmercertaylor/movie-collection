import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    genreModal: {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        minWidth: '16rem',
        padding: '2rem'
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row-reverse nowrap',
        justifyContent: 'center'
    },
    button: {
        margin: '1rem'
    }
});

export default function AddGenreModal({open, close}){
    const classes = useStyles();
    const [newGenre, setNewGenre] = useState('');

    const dispatch = useDispatch();

    const closeModal = () => {
        setNewGenre('');
        close();
    }

    const submitGenre = () => {
        if(newGenre !== ''){
            dispatch('ADD_GENRE', {name: newGenre});
            setNewGenre('');
            close();
        } else {
            close();
        }
    }

    return (
        <Modal open={open} onBackdropClick={closeModal}>
            <Paper className={classes.genreModal}>
                <Typography
                    component='h2'
                    variant='h3'
                >
                    Add Genre:
                </Typography>
                <form onSubmit={submitGenre}>
                    <TextField
                        color="primary"
                        label="New Genre"
                        value={newGenre}
                        onChange={e=>setNewGenre(e.target.value)}
                    />
                    <div className={classes.buttonRow}>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={submitGenre}
                        >
                            Submit
                        </Button>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='secondary'
                            onClick={closeModal}
                        >
                            Cancle
                        </Button>
                    </div>
                </form>
            </Paper>
        </Modal>
    );
}