'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _store = require('./src/store');

var _store2 = _interopRequireDefault(_store);

var _server = require('./src/server');

var _server2 = _interopRequireDefault(_server);

var _core = require('./src/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*jshint esversion: 6 */
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var httpTransport = require('https');
var MySportsFeeds = require("mysportsfeeds-node");
var Promise = require('promise');
var spawn = require("child_process").spawn;
var PythonShell = require('python-shell');


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

(0, _core.setMSFConfig)(msf);

PythonShell.run('sportsEvent.py', options, function (err, results) {
    if (err) throw err;
    (0, _core.getAllNews)(Promise).then(function (data) {
        store.dispatch({
            type: 'SET_CURRENT_ALL_NEWS',
            news: data
        });
    });
});

var store = exports.store = (0, _store2.default)();
(0, _server2.default)(store);

// getAllNews(http, process.env.NEWSAPI_API_KEY, Promise).then((data) => {
//     store.dispatch({
//         type: 'SET_CURRENT_ALL_NEWS',
//         news: data
//     });
// });


var app = express();

var db = require("./config/database.js");

var staticFiles = express.static(_path2.default.join(__dirname, '../../sports-spot-client/build'));

// app.use(express.static('./static/'));
app.use(staticFiles);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
    console.log('Listening on ' + app.get('port'));
});

// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);