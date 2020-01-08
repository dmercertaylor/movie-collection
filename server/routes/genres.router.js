const express = require('express');
const pool = require ('../modules/pool');

const router = express.Router();

router.get('/', (req, res)=>{
    const query = `
    SELECT "genre"."name", "genre"."id",
	(   SELECT COUNT("genre_id")
		FROM "movie_genre"
		WHERE "movie_genre"."genre_id"="genre"."id"
		GROUP BY "movie_genre"."genre_id"
	) AS "count" FROM "genre";`
    pool.query(query)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
    });
});

router.post('/', (req, res)=>{
    const query = 'INSERT INTO "genre" ("name") VALUES ($1)';
    pool.query(query, [req.body.name])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.delete('/:id', async (req, res)=>{
    try{
        const query = `DELETE FROM "movie_genre" WHERE "genre_id"=$1`;
        await pool.query(query, [req.params.id]);
        await pool.query('DELETE FROM "genre" WHERE "id"=$1', [req.params.id]);   
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;