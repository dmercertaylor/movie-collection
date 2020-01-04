import React from 'react';
import {useSelector} from 'react-redux';
import MovieInputFields from '../MovieInputFields/MovieInputFields';

export default function AddEntryPage(){
    const movies = useSelector(state=>state.moviesReducer);
    return (
        <div>
            <MovieInputFields />
            <pre>{JSON.stringify(movies)}</pre>
        </div>
    )
}