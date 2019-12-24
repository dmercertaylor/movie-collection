const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('build'));

app.listen(port, () =>{
    console.log('Listening on port: ', port);
});