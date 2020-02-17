const path = require('path');
const fs = require('fs');

const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

//Avoiding CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.messsage;
    res.status(status).json({ message: message });
})

mongoose
    .connect('mongodb+srv://cyrus:Y1B97SO21fuMmiI7@cluster0-xp4l4.mongodb.net/messages?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
