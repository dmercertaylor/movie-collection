import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
/*** Redux / Sagas ***/
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

/*** IMPORT SAGAS ***/
import getMoviesSaga from './redux/sagas/getMoviesSaga';
import getGenresSaga from './redux/sagas/getGenresSaga'

/*** IMPORT REDUCERS ***/
import moviesReducer from './redux/reducers/movies.reducer';
import genresReducer from './redux/reducers/genres.reducer';
import addMovieSaga from './redux/sagas/addMovieSaga';
import deleteMovieSaga from './redux/sagas/deleteMovieSaga';
import loadingMovieReducer from './redux/reducers/loadingMovie.reducer';

// rootSaga will run our saga reducers
function* rootSaga(){
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('GET_GENRES', getGenresSaga);
    yield takeEvery('ADD_MOVIE', addMovieSaga);
    yield takeEvery('DELETE_MOVIE', deleteMovieSaga);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        moviesReducer,
        genresReducer,
        loadingMovieReducer
    }),
    // applies sagaMiddleware to our store
    applyMiddleware(sagaMiddleware)
);

// pass rootSaga into our middleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));