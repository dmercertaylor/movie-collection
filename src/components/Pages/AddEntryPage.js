import React, { useCallback, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MovieInputFields from '../MovieInputFields/MovieInputFields';
import MovieCard from '../MovieCard/MovieCard';

export default function AddEntryPage(){
    /*** STATE SETUP ***/
    const movies = useSelector(state=>state.moviesReducer);

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
            <div>
                {movies.map(movie=> <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}