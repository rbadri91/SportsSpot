'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CURRENT_FEEDS = undefined;
exports.getSportsFeed = getSportsFeed;
exports.setMSFConfig = setMSFConfig;
exports.getAllNews = getAllNews;
exports.setCurrentNews = setCurrentNews;
exports.getCurrentAllNews = getCurrentAllNews;
exports.getCurrentNBANews = getCurrentNBANews;
exports.getCurrentNFLNews = getCurrentNFLNews;
exports.getCurrentNHLNews = getCurrentNHLNews;
exports.getCurrentMLBNews = getCurrentMLBNews;
exports.getScores = getScores;
exports.getSchedules = getSchedules;
exports.getTeamStats = getTeamStats;
exports.getStandings = getStandings;
exports.getStats = getStats;
exports.getRosterStats = getRosterStats;

var _immutable = require('immutable');

var fs = require("fs"); /*jshint esversion: 6 */

var Promise = require('promise');
var MySportsFeeds = require("mysportsfeeds-node");
var PythonShell = require('python-shell');

var msf;

var CURRENT_FEEDS = exports.CURRENT_FEEDS = (0, _immutable.List)();

function getSportsFeed(https, btoa, uName, passWord, Promise, seasonName, game, reqData, forDate) {
    var responseEncoding = 'utf8';
    var httpOptions = {
        hostname: 'api.mysportsfeeds.com',
        path: '/v1.1/pull/' + game + '/' + seasonName + '/' + reqData + '.json' + forDate ? '?fordate =' + forDate : '',
        method: 'GET',
        headers: { "Authorization": "Basic " + btoa("rbadri91" + ":" + "Test123") }
    };

    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    return new Promise(function (resolve, reject) {
        var request = httpTransport.request(httpOptions, function (res) {
            var responseBufs = [];
            var responseStr = '';

            res.on('data', function (chunk) {
                if (Buffer.isBuffer(chunk)) {
                    responseBufs.push(chunk);
                } else {
                    responseStr = responseStr + chunk;
                }
            }).on('end', function () {
                responseStr = responseBufs.length > 0 ? Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
                console.log("responseStr:", responseStr);
                resolve(JSON.parse(responseStr));
            });
        }).setTimeout(0).on('error', function (error) {
            console.log("message:", error.message);
            reject();
        });
        request.end();
    });
}

function setMSFConfig(MSFConfig) {
    msf = MSFConfig;
}

function getAllNews(Promise) {
    return new Promise(function (resolve) {
        fs.readFile('public/json/ALLSports.json', "utf8", function (err, data) {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}

function testfunction() {
    return new Promise(function (resolve) {
        fs.readFile('results/full_game_schedule-mlb-2016-playoff.json', "utf8", function (err, data) {
            if (err) throw err;
            console.log("data here:", JSON.parse(data));
            resolve((0, _immutable.List)(JSON.parse(data).fullgameschedule.gameentry));
        });
    });
}

function setCurrentNews(curr_feeds, newsList) {
    var list = (0, _immutable.List)(newsList);
    curr_feeds = (0, _immutable.List)(newsList);
    return Promise.resolve(curr_feeds);
}

function getCurrentAllNews(curr_feeds) {
    console.log("in get all current news");
    curr_feeds = new Promise(function (resolve, reject) {
        var options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: './',
            args: ['ALL']
        };

        PythonShell.run('sportsEvent.py', options, function (err, results) {
            if (err) throw err;
            curr_feeds = (0, _immutable.List)(JSON.parse(fs.readFileSync("public/json/AllSports.json")));
            resolve(curr_feeds);
        });
    });
    return curr_feeds;
}
function getCurrentNBANews(curr_feeds) {
    curr_feeds = new Promise(function (resolve, reject) {
        var options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: './',
            args: ['nba']
        };

        PythonShell.run('sportsEvent.py', options, function (err, results) {
            if (err) throw err;
            curr_feeds = (0, _immutable.List)(JSON.parse(fs.readFileSync("public/json/NBA.json")));
            resolve(curr_feeds);
        });
    });
    return curr_feeds;
}
function getCurrentNFLNews(curr_feeds) {
    curr_feeds = new Promise(function (resolve, reject) {
        var options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: './',
            args: ['nfl']
        };

        PythonShell.run('sportsEvent.py', options, function (err, results) {
            if (err) throw err;
            curr_feeds = (0, _immutable.List)(JSON.parse(fs.readFileSync("public/json/NFL.json")));
            resolve(curr_feeds);
        });
    });
    return curr_feeds;
}
function getCurrentNHLNews(curr_feeds) {
    curr_feeds = new Promise(function (resolve, reject) {
        var options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: './',
            args: ['nhl']
        };

        PythonShell.run('sportsEvent.py', options, function (err, results) {
            if (err) throw err;
            curr_feeds = (0, _immutable.List)(JSON.parse(fs.readFileSync("public/json/NHL.json")));
            resolve(curr_feeds);
        });
    });
    return curr_feeds;
}

function getCurrentMLBNews(curr_feeds) {
    curr_feeds = new Promise(function (resolve, reject) {
        var options = {
            mode: 'text',
            pythonPath: 'python',
            pythonOptions: ['-u'],
            scriptPath: './',
            args: ['mlb']
        };

        PythonShell.run('sportsEvent.py', options, function (err, results) {
            if (err) throw err;
            curr_feeds = (0, _immutable.List)(JSON.parse(fs.readFileSync("public/json/MLB.json")));
            resolve(curr_feeds);
        });
    });
    return curr_feeds;
}

function getScores(curr_feeds, game, season, forDate) {
    console.log("game here:", game);
    console.log("season here:", season);
    console.log("forDate here:", forDate);
    console.log("user name here:", process.env.MY_SF_LOGIN);
    var msf = new MySportsFeeds("1.0", true);
    msf.authenticate(process.env.MY_SF_LOGIN, process.env.MY_SF_PASSWORD);
    curr_feeds = new Promise(function (resolve, reject) {
        msf.getData(game, season, 'scoreboard', 'json', { fordate: forDate }).then(function (data) {
            return resolve((0, _immutable.List)(data.scoreboard.gameScore));
        }).catch(function () {
            return reject();
        });
    });
    return curr_feeds;
}

function getSchedules(curr_feeds, game, season, team) {
    console.log("team here:", team);
    console.log("game here:", game);
    console.log("season here:", season);
    team = team.trim();
    if (team != 'default') {
        curr_feeds = new Promise(function (resolve, reject) {
            msf.getData(game, season, 'full_game_schedule', 'json', { limit: 50, team: team }).then(function (data) {
                return resolve((0, _immutable.List)(data.fullgameschedule.gameentry.slice(0, 50)));
            }).catch(function () {
                return reject();
            });
        });
    } else {
        curr_feeds = new Promise(function (resolve, reject) {
            msf.getData(game, season, 'full_game_schedule', 'json', { limit: 50 }).then(function (data) {
                return resolve((0, _immutable.List)(data.fullgameschedule.gameentry));
            }).catch(function () {
                return reject();
            });
        });
    }
    return curr_feeds;
}

function sortdata(data, key, sortOrder) {
    if (sortOrder == 'desc') {
        data.sort(function (a, b) {
            if (a.stats[key]["#text"] > b.stats[key]["#text"]) return -1;
            if (b.stats[key]["#text"] > a.stats[key]["#text"]) return 1;
            return 0;
        });
    } else {
        data.sort(function (a, b) {
            if (a.stats[key]["#text"] < b.stats[key]["#text"]) return -1;
            if (b.stats[key]["#text"] < a.stats[key]["#text"]) return 1;
            return 0;
        });
    }

    return data;
}

function getSortedData(statType, sortBy, game, data) {
    var sortedData = [];
    if (false && game === 'nba') {
        switch (sortBy) {
            case 'stats.PTS/G.D':
                sortedData = sortdata(data, "PtsPerGame", 'desc');
                break;
            case 'stats.AST/G.D':
                sortedData = sortdata(data, "AstPerGame", 'desc');
                break;
            case 'stats.FG%.D':
                sortedData = sortdata(data, "FgPct", 'desc');
                break;
            case 'stats.FT%.D':
                sortedData = sortdata(data, "FtPct", 'desc');
                break;
            case 'stats.3P%.D':
                sortedData = sortdata(data, "Fg3PtPct", 'desc');
                break;
            case 'stats.F/G.D':
                sortedData = sortdata(data, "FoulsPerGame", 'desc');
                break;
            case 'stats.REB/G.D':
                sortedData = sortdata(data, "RebPerGame", 'desc');
                break;
            case 'stats.BS/G.D':
                sortedData = sortdata(data, "BlkPerGame", 'desc');
                break;
            case 'stats.STL/G.D':
                data = sortdata(data, "StlPerGame", 'desc');
                break;
            case 'stats.TOV/G.D':
                sortedData = sortdata(data, "TovPerGame", 'desc');
                break;
            case 'stats.PTSA/G':
                sortedData = sortdata(data, "PtsAgainstPerGame", 'asc');
                break;
            case 'stats.AST/G':
                sortedData = sortdata(data, "AstPerGame", 'asc');
                break;
            case 'stats.FG%':
                sortedData = sortdata(data, "FgPct", 'asc');
                break;
            case 'stats.FT%':
                sortedData = sortdata(data, "FtPct", 'asc');
                break;
            case 'stats.3P%':
                sortedData = sortdata(data, "Fg3PtPct", 'asc');
                break;
            default:
                sortedData = data;
                break;
        }
    } else {
        sortedData = data;
    }
    return sortedData;
}

function getTeamStats(curr_feeds, game, season, teamStats, sortBy, statType) {
    if (teamStats != 'default') {
        curr_feeds = new Promise(function (resolve, reject) {
            return msf.getData(game, season, 'overall_team_standings', 'json', { teamstats: teamStats, sort: sortBy }).then(function (data) {
                return resolve((0, _immutable.List)(data.overallteamstandings.teamstandingsentry));
            }).catch(function (reason) {
                console.log("it comes here to reject:", reason);
                return reject();
            });
        });
    } else {
        curr_feeds = new Promise(function (resolve, reject) {
            return msf.getData(game, season, 'overall_team_standings', 'json', { sort: sortBy }).then(function (data) {
                console.log("data fetched");
                return resolve((0, _immutable.List)(data.overallteamstandings.teamstandingsentry));
            }).catch(function (reason) {
                console.log("it comes here to reject:", reason);
                return reject();
            });
        });
    }

    return curr_feeds;
}

function getStandings(curr_feeds, game, season, teamStats, sortBy) {

    if (!sortBy || sortBy == 'default') {
        curr_feeds = new Promise(function (resolve, reject) {
            return msf.getData(game, season, 'division_team_standings', 'json', { teamstats: teamStats }).then(function (data) {
                console.log("data here");
                return resolve((0, _immutable.List)(data.divisionteamstandings.division));
            }).catch(function () {
                return reject();
            });
        });
    } else {
        curr_feeds = new Promise(function (resolve, reject) {
            return msf.getData(game, season, 'division_team_standings', 'json', { teamstats: teamStats, sort: sortBy }).then(function (data) {
                console.log("data here");
                return resolve((0, _immutable.List)(data.divisionteamstandings.division));
            }).catch(function () {
                return reject();
            });
        });
    }
    return curr_feeds;
}

function getStats(curr_feeds, game, season, playerStats, sortBy) {
    console.log("playerStats here:", playerStats);
    console.log("sortBy here:", sortBy);
    console.log("game here:", game);
    console.log("season here:", season);
    if (sortBy != 'default') {
        curr_feeds = new Promise(function (resolve, reject) {
            msf.getData(game, season, 'cumulative_player_stats', 'json', { playerstats: playerStats, sort: sortBy }).then(function (data) {
                return resolve((0, _immutable.List)(data.cumulativeplayerstats.playerstatsentry));
            }).catch(function () {
                return reject();
            });
        });
    } else {
        curr_feeds = new Promise(function (resolve, reject) {
            msf.getData(game, season, 'cumulative_player_stats', 'json', { playerstats: playerStats }).then(function (data) {
                return resolve((0, _immutable.List)(data.cumulativeplayerstats.playerstatsentry));
            }).catch(function () {
                return reject();
            });
        });
    }
    return curr_feeds;
}

function getRosterStats(curr_feeds, game, season, team) {
    console.log("team here:", team);
    curr_feeds = new Promise(function (resolve, reject) {
        msf.getData(game, season, 'roster_players', 'json', { team: team }).then(function (data) {
            return resolve((0, _immutable.List)(data.rosterplayers.playerentry));
        }).catch(function () {
            return reject();
        });
    });
    return curr_feeds;
}