import axios from 'axios';
import {put} from 'redux-saga/effects';

export default function* deleteMovieSaga(action){
    try{
        yield axios.delete(`/api/genres/${action.payload.id}`);
        yield put({type: 'GET_GENRES'});
    } catch(error){
        console.log(error);
    }
}