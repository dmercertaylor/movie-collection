const express = require('express');
const multer = require('multer');
const pool = require ('../modules/pool');
const uploadFile = require('../modules/upload');
const getFileExtension = require('../modules/getFileExtension');

const router = express.Router();
const upload = multer();

/*** GET ROUTE ***/
router.get('/', (req, res)=>{
    const config = [];
    let queryText = `
        SELECT "id", "title",
            TO_CHAR("release_date", 'Mon dd, YYYY') AS "release_date",
            "run_time", "poster",
            (
                SELECT array_agg('{' || '"id":' || "genre"."id" || ',"name":"' || "genre"."name" || '"}')
                FROM "movie_genre"
                JOIN "genre" ON "genre"."id"="movie_genre"."genre_id"
                WHERE "movie"."id" = "movie_genre"."movie_id"
            )
            AS "genres" FROM "movie"`;
    
    if(req.query.genre){
        queryText += `
            JOIN "movie_genre" ON "movie_genre"."movie_id" = "movie"."id"
            JOIN "genre" ON "movie_genre"."genre_id" = "genre"."id"
            WHERE "genre"."name" ILIKE '%$1%'`;
        config.push(req.query.genre);
    }

    switch(req.query.order){
        case 'release_date':
            queryText += `ORDER BY "release_date"`;
            break;
        case 'run_time':
            queryText += `ORDER BY "run_time"`;
            break;
        default:
            queryText += `ORDER BY "title"`;
    }

    pool.query(queryText, config)
        .then(result => {
            console.log(result.rows);
            result.rows.forEach(movie => {
                if(!movie.genres){
                    movie.genres = [];
                }
                movie.genres = movie.genres.map(genre=>JSON.parse(genre));
            })
            res.send(result.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res)=>{
    pool.query('DELETE FROM "movie" WHERE "id"=$1', [req.params.id])
        .then(result => {
            pool.query('DELETE FROM "movie_genre" WHERE "movie_id"=$1', [req.params.id])
                .then(results => {
                    res.sendStatus(200);
                }).catch(error => {
                    console.log(error);
                    res.sendStatus(500);
                });
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

/*** POST ROUTE ***/
router.post('/', upload.single('poster'), async (req, res)=>{
    try{
        const movie = JSON.parse(req.body.movie);
        let newMovieId = undefined;

        /*** INSERT KNOWN VALUES INTO MOVIE ***/
        let query = `
            INSERT INTO "movie" ("title", "release_date", "run_time")
            VALUES ($1, $2, $3)
            RETURNING "id"`;

        let config = [movie.title, movie.release_date, movie.run_time];
        const newMovie = await pool.query(query, config);
        newMovieId = newMovie.rows[0].id;

        /*** UPLOAD POSTER TO S3 ***/
        const fileName = `${newMovieId}${getFileExtension(req.file.originalname)}`;
        const uploaded = await uploadFile(fileName, req.file);

        /*** ADD POSTER LOCATION TO DATABASE ***/
        query = `UPDATE "movie" SET "poster"=$1 WHERE "id"=$2`;
        await pool.query(query, [uploaded.Location, newMovieId]);

        /*** ADD GENRES TO movie_genre RELATION ***/
        const genres = JSON.parse(req.body.genres);
        query = `
            INSERT INTO "movie_genre" ("movie_id", "genre_id")
                VALUES ${genres.map((_,i)=>
                    `(${newMovieId}, $${i+1})`).join(', ')
                }`;
        await pool.query(query, genres.map(genre => genre.id));

        res.sendStatus(201);
    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;