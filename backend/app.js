const express = require('express');
const mongoose = require('mongoose');

const flightsRoutes = require('./routes/flights');
const usersRoutes = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/go-on-air', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.error('Database ready');
    }).catch((err) => {
        console.error('Connection error: ', err);
    });

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/flights', flightsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
