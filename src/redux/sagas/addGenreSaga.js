import axios from 'axios';
import {put} from 'redux-saga/effects';

export default function* addMovieSaga(action){
    try{
        const payload = {name: action.payload.name}
        yield axios.post('/api/genres', payload);
        yield put({type: 'GET_GENRES'});
    } catch(error){
        console.log(error);
    }
}