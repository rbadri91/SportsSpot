/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var MySportsFeeds = require("mysportsfeeds-node");
var Promise = require('promise');

import makeStore from './src/store';
import startServer from './src/server';
import { getAllNews } from './src/core';

var msf = new MySportsFeeds("1.0", true);

var dotenv = require('dotenv');
dotenv.load();

msf.authenticate(process.env.MY_SF_LOGIN, process.env.MY_SF_PASSWORD);

export const store = makeStore();
startServer(store);

getAllNews(http, process.env.NEWSAPI_API_KEY, Promise).then((data) => {
    store.dispatch({
        type: 'SET_CURRENT_ALL_NEWS',
        news: data
    });
});

const app = express();

const db = require("./config/database.js");

app.use(express.static('./static/'));

app.use(bodyParser.urlencoded({ extended: false }));

// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);