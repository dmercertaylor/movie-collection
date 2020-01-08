import React from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';

// style
import useStyle from './style';


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
                                component='h2'
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