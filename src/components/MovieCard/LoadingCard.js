import React from 'react';
import Card from "@material-ui/core/Card";
import {useStyles} from './MovieCard';
import CircularProgress from '@material-ui/core/CircularProgress';

// Spinning circle in card that looks like MovieCard
export default function LoadingCard(){
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CircularProgress />
        </Card>
    )
}