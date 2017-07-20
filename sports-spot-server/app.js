const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require("./config/database.js");

app.use(express.static('./static/'));

app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);