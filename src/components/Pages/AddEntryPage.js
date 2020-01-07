import React, { useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MovieInputFields from '../MovieInputFields/MovieInputFields';
import MovieCard from '../MovieCard/MovieCard';
import LoadingCard from '../MovieCard/LoadingCard';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    movieDisplay: {
        display: 'flex',
        flexFlow: 'row wrap'
    }
});

export default function AddEntryPage(){
    /*** STATE SETUP ***/
    const movies = useSelector(state=>state.moviesReducer);
    const movieLoading = useSelector(state=>state.loadingMovieReducer);
    const classes = useStyles();

    /*** REDUX SETUP ***/
    // useCallback ensures dispatch has constant address,
    // so page does not rerender infinitely
    const dispatch = useCallback(useDispatch(), []);

    useEffect(() => {
        dispatch({type: 'GET_MOVIES'});
    }, [dispatch]);

    return (
        <div>
            <MovieInputFields />
            <div className={classes.movieDisplay}>
                {movies.map(movie=> <MovieCard key={movie.id} movie={movie} />)}
                {movieLoading?<LoadingCard />:null}
            </div>
        </div>
    )
}