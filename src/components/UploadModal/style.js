import { makeStyles } from '@material-ui/core/styles';

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
        justifyContent: 'center',
        padding: '0 2rem'
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

export default useStyle;