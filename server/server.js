const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

/*** MIDDLEWARES ***/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/*** ROUTES ***/
const movieRouter = require('./routes/movies.router');

app.use('/api/movies', movieRouter);

/*** START SERVER ***/
app.listen(port, () =>{
    console.log('Listening on port: ', port);
});