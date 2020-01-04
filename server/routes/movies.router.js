const express = require('express');
const pool = require ('../modules/pool');

const router = express.Router();

/*** GET ROUTE ***/
router.get('/', (req, res)=>{
    const config = [];
    let queryText = `
        SELECT *,
            (
                SELECT array_agg("genre"."id")
                FROM "movie_genre"
                JOIN "genre" ON "genre"."id"="movie_genre"."genre_id"
                WHERE "movie"."id" = "movie_genre"."movie_id"
            )
            AS "genre_id_csv" FROM "movie"`;

    if(req.query.genre){
        queryText += `
            JOIN "movie_genre" ON "movie_genre"."movie_id" = "movie"."id"
            JOIN "genre" ON "movie_genre"."genre_id" = "genre"."id"
            WHERE "genre"."name" ILIKE '%$1%'`;
        config.push(req.query.genre);
    }
    switch(req.query.order){
        case 'release_date':
            queryText += `ORDER BY 'release_date'`;
            break;
        case 'run_time':
            queryText += `ORDER BY 'run_time'`;
            break;
        default:
            queryText += `ORDER BY 'title'`;
    }

    pool.query(queryText, config)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

/*** POST ROUTE ***/
router.post('/', (req, res)=>{
    const movie = req.body.movie;
    const movieQuery = `
        INSERT INTO "movie" ("title", "release_date", "run_time")
        VALUES ($1, $2, $3)
        RETURNING "id"`;
    pool.query(movieQuery, [movie.title, movie.release_date, movie.run_time])
        .then(movieResponse => {
            const genres = req.body.genres;
            let genreQuery = `INSERT INTO "movie_genre" ("movie_id", "genre_id")
                            VALUES ${genres.map((_,i)=>
                                `(${movieResponse.rows[0].id} $${i+1})`).join(', ')
                            }`;
            pool.query(genreQuery, genres)
                .then(genreResponse => {
                    res.sendStatus(201);
                }).catch(error => {
                    console.log(error);
                    res.sendStatus(500);
            });
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
    });
})

module.exports = router;