const genresReducer = (state = [], action) => {
    if(action.type === 'SET_GENRES'){
        return action.payload;
    }
    return state;
}

export default genresReducer;