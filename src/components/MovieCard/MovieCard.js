import React from 'react';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 400,
        minWidth: 200,
        maxHeight: 600,
        margin: 8
    },
    center: {
        
    },
    poster: {
        maxWidth: 200
    },
    runtime: {
        color: '#777777'
    }
});

// Displays data from movie object in decent card
export default function MovieCard({movie}){
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.poster}
                component="img"
                image={movie.poster}
                title={movie.title}
            />
            <CardHeader
                title={movie.title}
                subheader={
                    `${movie.release_date} - ${movie.run_time.hours}:${movie.run_time.minutes}`
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {movie.genres.map((genre, i)=> 
                        `${genre.name}${i !== movie.genres.length - 1 ? ', ' : ''}`
                    )}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" variant='contained'
                    onClick={()=>dispatch({type: 'DELETE_MOVIE', payload: movie})}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}