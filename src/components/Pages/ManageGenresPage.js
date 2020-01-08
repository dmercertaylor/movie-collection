import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// Styles
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Components
import AddGenreModal from '../AddGenreModal/AddGenreModal';

const useStyles = makeStyles({
    button: {
        margin: '1rem',

    }
});

export default function ManageGenresPage(){
    
    /* STATE */
    const [genreModalOpen, setGenreModalOpen] = useState(false);
    const genres = useSelector(state=>state.genresReducer);

    const dispatch = useCallback(useDispatch(), []);
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'GET_GENRES'});
    }, [dispatch]);

    // MAPPED COMPONENTS
    const genreRows = genres.filter(a=>!!a.count).map(genre =>
            <TableRow key={genre.id}>
                <TableCell>{genre.name}</TableCell>
                <TableCell>{genre.count}</TableCell>
                <TableCell>
                    <Button 
                        variant='contained'
                        color='secondary'
                        onClick={()=>{
                            dispatch({type: 'DELETE_GENRE', payload: {id: genre.id}});
                        }}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        );

    return (
        <div>
            <Button
                className={classes.button}
                onClick={()=>setGenreModalOpen(true)}
                variant='contained'
                color='primary'
            >
                Add Genre
            </Button>
            <AddGenreModal
                open={genreModalOpen}
                close={()=>setGenreModalOpen(false)}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Genre</TableCell>
                            <TableCell>Total Movies</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {genreRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}