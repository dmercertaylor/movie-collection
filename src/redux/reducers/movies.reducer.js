const moviesReducer = (state = [], action) => {
    if(action.type === 'SET_MOVIES'){
        return action.payload;
    }
    return state;
}

export default moviesReducer;