import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    inputModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '100vw',
        padding: '1.5rem',
        width: 'max-content'
    },
    form: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
        margin: '0 auto',
        width: '100%',
        maxWidth: 'max-content'
    },
    button: {
        margin: '6px',
        alignSelf: 'flex-end'
    },
    margin: {
        margin: '8px'
    },
    container: {
        display: 'flex',
        flexFlow: 'row wrap',
        maxWidth: '100%'
    },
    newRow: {
        width: '100%'
    },
    posterContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        maxWidth: '11rem',
    },
    posterPreview: {
        width: '80%',
        borderRadius: '4px',
        height: 'auto',
    },
    clearBackground: {
        backgroundColor: 'rgba(0,0,0,0) !important',
        color: 'black'
    }
});

export default useStyles;