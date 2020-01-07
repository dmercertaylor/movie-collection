import axios from 'axios';
import {put} from 'redux-saga/effects';

export default function* addMovieSaga(action){
    try{
        yield put({type: 'LOADING_MOVIE', payload: true});
        const formData = new FormData();
        formData.append('poster', action.payload.poster);
        formData.append('genres', JSON.stringify(action.payload.genres));
        formData.append('movie', JSON.stringify(action.payload.movie));
        const url = '/api/movies';

        yield axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        yield put({type: 'GET_MOVIES'});
        yield put({type: 'LOADING_MOVIE', payload: false});
    } catch(error){
        console.log(error);
    }
}