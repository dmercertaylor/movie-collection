import React, {useState, useCallback, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MovieInputFields(){
    
    /*** STATE SETUP ***/
    const [title, setTitle] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [runtime, setRuntime] = useState('');
    const posterInput = useRef();

    const verifyAndSetRuntime = event => {
        const newTime = event.target.value;
        if(newTime === '' || /^\d{1,2}(:|(:[0-5])|(:[0-5]\d))?$/.test(newTime)){
            setRuntime(newTime);
        }
    }

    const resetState = () => {
        setTitle('');
        setSelectedGenres([]);
        setReleaseDate('');
        setRuntime('');
    }

    /*** REDUX SETUP ***/
    const dispatch = useCallback(useDispatch(), []);
    const genres = useSelector(state => state.genresReducer);

    /*** HANDLE SUBMIT ***/
    const submitMovie = event => {
        if(!title){
            alert('Please enter a title.');
            return;
        }
        if(!selectedGenres.length){
            alert('Please select at least one genre.');
            return;
        }
        if(!releaseDate){
            alert('Please enter a release date.');
            return;
        }
        if(!runtime || runtime === '0'){
            alert('Please enter a runtime.');
            return;
        }
        if(!posterInput){
            alert('Please submit a poster.');
            return;
        }

        let sentRuntime = runtime;
        if(!sentRuntime.includes(':')){
            sentRuntime += ':00';
        } else if(sentRuntime.split(':')[1].length === 1){
            sentRuntime += '0';
        }
        const payload = {
            movie: {
                title: title,
                release_date: releaseDate,
                run_time: sentRuntime
            },
            poster: posterInput.current.files[0],
            genres: selectedGenres
        }
        dispatch({type: 'ADD_MOVIE', payload});
        resetState();
    }

    /*** MAPPED ITEMS ***/
    const removeableGenres = selectedGenres.map((genre, i) =>
        <button key={genre.id} onClick={
            ()=>setSelectedGenres(selectedGenres.filter((_,j)=>j!==i))
        }>{genre.name}</button>
    );

    const addableGenres = genres.map(option => {
        for(const genre of selectedGenres){
            if(option.id === genre.id){
                return null;
            }
        }
        return (
            <option key={option.id} value={JSON.stringify(option)}>
                {option.name}
            </option>
        );
    }).filter(a=>a!==null);

    /*** RETURN ***/
    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={submitMovie}>
                <input type="text" value={title}
                onChange={ e => setTitle(e.target.value) }/>

                {removeableGenres}

                <select onChange={ 
                    e => setSelectedGenres([...selectedGenres, JSON.parse(e.target.value)])
                }>
                    <option value=''>Add Genre</option>
                    {addableGenres}
                </select>
                
                <input type="date" value={releaseDate}
                onChange={e=>setReleaseDate(e.target.value)}/>
                <input type="text" value={runtime}
                onChange={verifyAndSetRuntime} placeholder='0:00' />
                <label>Upload Poster: 
                    <input type="file" ref={posterInput} accept="image/*" />
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}