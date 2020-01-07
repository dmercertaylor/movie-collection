import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

const useStyle = makeStyles({
    uploadModal: {
        position: 'absolute',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '75vh',
        minWidth: '16rem',
        minHeight: '12rem'
    },
    dragAndDropArea: {
        width: '90%',
        height: '75%',
        border: '5px dashed #C0C0C0',
        margin: 'auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center'
    },
    dragAndDropContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem'
    },
    cancleButton: {
        alignSelf: 'flex-end'
    }
});

export default function UploadModal({open, onDrop, close}){

    const classes = useStyle(); 

    const closeButtonPress = e => {
        e.stopPropagation();
        close();
    }

    return(
        <Modal
            open={open}
            onBackdropClick={close}
        >
            <Paper className={classes.uploadModal}>
                <Dropzone
                    onDrop={onDrop}
                    accept='image/*'
                    maxSize={1048576 * 2}
                >
                    {({getRootProps, getInputProps, isDragReject, isDragAccept}) => (
                        <div {...getRootProps()} className={classes.dragAndDropContainer}>
                            <input {...getInputProps()} />
                            <Typography
                                className={classes.dragAndDropArea}
                                variant='h4'
                                style={isDragAccept ?
                                    {borderColor: '#22FF22'} :
                                    !isDragReject?
                                        {} :
                                        {borderColor: '#FF2222'}}
                            >
                                Click Here or Drag and Drop a File
                            </Typography>
                            <Button
                                onClick={closeButtonPress}
                                variant='contained'
                                color='secondary'
                                className={classes.cancleButton}
                            >Cancle</Button>
                        </div>
                    )}
                </Dropzone>
            </Paper>
        </Modal>
    )
}