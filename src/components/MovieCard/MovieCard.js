import React from 'react';

export default function MovieCard({movie}){
    return (
        <div>
            <h4>{movie.title}</h4>
            <p>{movie.genres.map((genre, i)=>{
                return `${genre.name}${i !== movie.genres.length - 1 ? ', ' : ''}`
            })}</p>
            <p>Released {movie.release_date}</p>
        </div>
    )
}