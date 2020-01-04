import axios from 'axios';
import {put} from 'redux-saga/effects';
import getUrlQueries from './modules/getUrlQueries';

export default function* getMoviesSaga(action){
    try{
        const url = getUrlQueries('/api/movies', action.payload);
        const response = yield axios.get(url);
        yield put({type: 'SET_MOVIES', payload: response.data})
    } catch(error){
        console.log(error);
    }
}