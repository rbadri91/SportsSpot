/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');

import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer();

const app = express();

const db = require("./config/database.js");

app.use(express.static('./static/'));

app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);