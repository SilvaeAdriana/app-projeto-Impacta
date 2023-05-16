const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('./db')

const app = express();

app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        '*'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    } 
    next();
});

app.use(routes);

app.use((req, res, next) => {
    res.json(err);
});

module.exports = app;
