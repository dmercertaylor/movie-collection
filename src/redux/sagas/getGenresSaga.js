import axios from 'axios';
import {put} from 'redux-saga/effects';

export default function* getMoviesSaga(action){
    try{
        const response = yield axios.get('/api/genres');
        yield put({type: 'SET_GENRES', payload: response.data})
    } catch(error){
        console.log(error);
    }
}