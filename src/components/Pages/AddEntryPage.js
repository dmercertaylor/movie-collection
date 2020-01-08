import React, { useState, useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MovieInputFields from '../MovieInputFields/MovieInputFields';
import MovieCard from '../MovieCard/MovieCard';
import LoadingCard from '../MovieCard/LoadingCard';

// material ui
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    body: {
        marginTop: '16px',
        textAlign: 'center'
    },
    movieDisplay: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        marginTop: '0.75rem'
    }
});

export default function AddEntryPage(){
    /*** STATE SETUP ***/
    const movies = useSelector(state=>state.moviesReducer);
    const movieLoading = useSelector(state=>state.loadingMovieReducer);
    const [addMovieOpen, setAddMovieOpen] = useState(false);
    const classes = useStyles();

    /*** REDUX SETUP ***/
    // useCallback ensures dispatch has constant address,
    // so page does not rerender infinitely
    const dispatch = useCallback(useDispatch(), []);

    useEffect(() => {
        dispatch({type: 'GET_MOVIES'});
    }, [dispatch]);

    return (
        <div className={classes.body}>
            <Button variant='contained' color='primary'
                onClick={()=>setAddMovieOpen(true)}>
                Add Movie
            </Button>
            <MovieInputFields open={addMovieOpen} close={()=>setAddMovieOpen(false)} />
            <div className={classes.movieDisplay}>
                {movies.map(movie=> <MovieCard key={movie.id} movie={movie} />)}
                {movieLoading?<LoadingCard />:null}
            </div>
        </div>
    )
}