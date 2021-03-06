import React, {useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

// Components
import UploadModal from '../UploadModal/UploadModal';

// style
import useStyles from './style';


export default function MovieInputFields({open, close}){
    
    /*** STATE SETUP ***/
    const [title, setTitle] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [runtime, setRuntime] = useState('');
    const [fileDialogOpen, setFileDialogOpen] = useState(false);
    const [poster, setPoster] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const classes = useStyles();

    // Updates setTime, making sure format is valid
    const verifyAndSetRuntime = event => {
        const newTime = event.target.value;
        if(/^\d$/.test(newTime) && runtime === ''){
            setRuntime(newTime + ':');
        } else if(newTime === '' || /^\d+(:|(:[0-5])|(:[0-5]\d))?$/.test(newTime)){
            setRuntime(newTime);
        }
    }

    // resets state
    const resetState = () => {
        setTitle('');
        setSelectedGenres([]);
        setReleaseDate('');
        setRuntime('');
        // For some reason, this makes react
        // render a new file, thereby resetting it.
        setPosterPreview(null);
        setPoster(null);
    }

    // Reads file from upload modal and closes it
    const saveAndCloseDialog = (files) => {
        const reader = new FileReader();
        
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (event) => setPosterPreview(event.target.result);
        reader.readAsDataURL(files[0]);

        setPoster(files[0]);
        setFileDialogOpen(false);
    }

    /*** REDUX SETUP ***/
    const dispatch = useCallback(useDispatch(), []);
    const genres = useSelector(state => state.genresReducer);

    /*** HANDLE SUBMIT ***/
    // Does basic input validation, resets state,
    // adds movie, and closes modal.
    const submitMovie = event => {
        event.preventDefault();

        if(!title){
            alert('Please enter a title.');
            return;
        }
        if(!selectedGenres.length){
            alert('Please select at least one genre.');
            return;
        }
        if(!releaseDate){
            alert('Please enter a release date.');
            return;
        }
        if(!runtime || runtime === '0'){
            alert('Please enter a runtime.');
            return;
        }
        if(!poster){
            alert('Please submit a poster.');
            return;
        }

        // Format time correctly
        let sentRuntime = runtime;
        if(!sentRuntime.includes(':')){
            sentRuntime += ':00';
        } else if(sentRuntime.split(':')[1].length === 1){
            sentRuntime += '0';
        }

        const payload = {
            movie: {
                title: title,
                release_date: releaseDate,
                run_time: sentRuntime
            },
            poster: poster,
            genres: selectedGenres
        }
        resetState();
        dispatch({type: 'ADD_MOVIE', payload});
        close();
    }

    /*** MAPPED ITEMS ***/
    // Maps selected genres as buttons that,
    // when clicked, remove genre */
    const removeableGenres = selectedGenres.map((genre, i) =>
        <Button variant='outlined' key={genre.id}
            color='secondary' className={classes.button}
            onClick={()=>setSelectedGenres(selectedGenres.filter((_,j)=>j!==i))}
            size='small'
        >{genre.name}</Button>
    );

    const addableGenres = genres.map(option => {
        for(const genre of selectedGenres){
            if(option.id === genre.id){
                return null;
            }
        }
        return (
            <option key={option.id} value={JSON.stringify(option)}>
                {option.name}
            </option>
        );
    }).filter(a=>a!==null);

    /*** RETURN ***/
    // TODO: Break this up.
    return (
        <Modal open={open} onBackdropClick={close}>
            <Paper className={classes.inputModal}>
                <Typography variant='h4'>Add Movie</Typography>
                <form onSubmit={submitMovie} className={classes.form}>
                    <TextField
                        className={classes.margin}
                        label="Title"
                        color="primary"
                        value={title}
                        onChange={ e => setTitle(e.target.value) }
                    />
                    <div className={classes.container}>
                        <TextField
                            className={classes.margin}
                            type="date" 
                            label="Release Date"
                            value={releaseDate}
                            InputLabelProps={{shrink: true}}
                            onChange={e=>setReleaseDate(e.target.value)}
                        />
                        <TextField
                            className={classes.margin}
                            type="text"
                            label="Run Time"
                            value={runtime}
                            onChange={verifyAndSetRuntime}
                            placeholder='0:00'
                        />
                    </div>
                    <div className={classes.newRow}>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor='movieInputGenre'>Add Genre</InputLabel>
                            <Select
                                native
                                id='movieInputGenre'
                                onChange={ e=>setSelectedGenres(
                                    [JSON.parse(e.target.value), ...selectedGenres]
                                )}
                                inputProps={{'aria-label':'genre'}}
                            >
                                <option value=''>Select Genre</option>
                                {addableGenres}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.newRow}>
                        {removeableGenres}
                    </div>
                    <div className={`${classes.newRow} ${classes.posterContainer}`}>
                        {posterPreview!==null ?
                            <img src={posterPreview} alt='New poster' className={classes.posterPreview} />
                            : null }
                        <Button
                            className={classes.button}
                            variant='contained'
                            onClick={()=>setFileDialogOpen(true)}
                        >
                            {posterPreview? 'Change':'Upload'} Poster
                        </Button>
                        <UploadModal
                            open={fileDialogOpen}
                            onDrop={saveAndCloseDialog}
                            close={()=>setFileDialogOpen(false)}
                        />
                    </div>
                    <div className={classes.newRow}>
                        <Button variant='contained' color='secondary'
                            className={classes.button} onClick={close}>Cancle</Button>
                        <Button variant='contained' color='primary'
                            className={classes.button} onClick={submitMovie}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </Modal>
    )
}