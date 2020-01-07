const express = require('express');
const pool = require ('../modules/pool');

const router = express.Router();

router.get('/', (req, res)=>{
    pool.query(`SELECT * FROM "genre"`)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
    });
});

module.exports = router;