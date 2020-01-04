import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MovieInputFields(){
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');

    const dispatch = useCallback(useDispatch(), []);
    const genres = useSelector(state => state.genresReducer);
    useEffect(() => {
        dispatch({type: 'GET_GENRES'});
    }, [dispatch]);

    return (
        <div>
            <h2>Add Movie</h2>
            <form>
                <input type="text" value={title}
                onChange={ e => setTitle(e.target.value) }/>
                <select>
                    <option value=''>Genre</option>
                    {genres.map(a =>
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    )}
                </select>
            </form>
        </div>
    )
}