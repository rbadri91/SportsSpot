/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const httpTransport = require('https');
var MySportsFeeds = require("mysportsfeeds-node");
var Promise = require('promise');
var spawn = require("child_process").spawn;
var PythonShell = require('python-shell');
import path from 'path';

import makeStore from './src/store';
import startServer from './src/server';
import { getAllNews, setMSFConfig } from './src/core';


var msf = new MySportsFeeds("1.0", true);

var dotenv = require('dotenv');
dotenv.load();

var options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'],
    scriptPath: './',
    args: ['ALL']
};

msf.authenticate(process.env.MY_SF_LOGIN, process.env.MY_SF_PASSWORD);

setMSFConfig(msf);

PythonShell.run('sportsEvent.py', options, function(err, results) {
    if (err) throw err;
    getAllNews(Promise).then((data) => {
        store.dispatch({
            type: 'SET_CURRENT_ALL_NEWS',
            news: data
        });
    });
});

const PORT = process.env.PORT || 8090;

const app = express();

const db = require("./config/database.js");

const staticFiles = express.static(path.join(__dirname, '../../sports-spot-client/build'));

app.use(staticFiles);
app.use('/*', staticFiles);

app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

app.get('*', isHTTPS, function(req, res, next) {
    next();
});

app.post('*', isHTTPS, function(req, res, next) {
    next();
});

function isHTTPS(req, res, next) {
    //console.log(req.header['x-forwarded-proto']);
    if (req.headers['x-forwarded-proto'] != 'https' && req.headers.host != 'localhost:8080') {
        //console.log('https://'+ req.headers.host);
        //console.log(req.url);
        res.redirect('https://' + req.headers.host + req.url);
    } else next();
}

export const store = makeStore();
startServer(store, server);

// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);