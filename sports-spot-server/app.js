/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const httpTransport = require('https');
var MySportsFeeds = require("mysportsfeeds-node");
var Promise = require('promise');
var spawn = require("child_process").spawn;
var PythonShell = require('python-shell');

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

// msf.getData('mlb', '2016-playoff', 'full_game_schedule', 'json', {}).then((data) => {
//     console.log("test data:", data.fullgameschedule.gameentry);
// });

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


export const store = makeStore();
startServer(store);


// getAllNews(http, process.env.NEWSAPI_API_KEY, Promise).then((data) => {
//     store.dispatch({
//         type: 'SET_CURRENT_ALL_NEWS',
//         news: data
//     });
// });





const app = express();

const db = require("./config/database.js");

app.use(express.static('./static/'));

app.use(bodyParser.urlencoded({ extended: false }));

// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);