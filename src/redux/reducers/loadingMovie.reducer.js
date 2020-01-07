const loadingMovieReducer = (state = false, action) => {
    if(action.type === 'LOADING_MOVIE'){
        return action.payload;
    }
    return state;
}

export default loadingMovieReducer;