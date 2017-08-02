/*jshint esversion: 6 */
import { List } from 'immutable';
var fs = require("fs");
var Promise = require('promise');
var MySportsFeeds = require("mysportsfeeds-node");

var msf;

export const CURRENT_FEEDS = List();

// export function getAllNews(http, apiKey, Promise) {
//     var options = {
//         host: 'newsapi.org',
//         path: '/v1/articles?source=espn&sortBy=top&apiKey='+apiKey
//     };
//     console.log("in get all news");
//     return new Promise(function(resolve, reject) {
//         var request = http.request(options, function(res) {
//             var data = '';
//             console.log("comes inside data accumulation");

//             res.on('data', function(chunk) {
//                 data += chunk;
//             });
//             res.on('end', function() {
//                 console.log("data here:" + JSON.parse(data).articles);
//                 data = JSON.parse(data);
//                 resolve(data.articles);
//             });
//         });
//         request.on('error', function(e) {
//             console.log(e.message);
//             reject();
//         });
//         request.end();
//     });
// }
export function getSportsFeed(https, btoa, uName, passWord, Promise, seasonName, game, reqData, forDate) {
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.mysportsfeeds.com',
        path: '/v1.1/pull/' + game + '/' + seasonName + '/' + reqData + '.json' + (forDate) ? '?fordate =' + forDate : '',
        method: 'GET',
        headers: { "Authorization": "Basic " + btoa("rbadri91" + ":" + "Test123") }
    };

    httpOptions.headers['User-Agent'] = 'node ' + process.version;

    return new Promise(function(resolve, reject) {
        const request = httpTransport.request(httpOptions, (res) => {
                let responseBufs = [];
                let responseStr = '';

                res.on('data', (chunk) => {
                    if (Buffer.isBuffer(chunk)) {
                        responseBufs.push(chunk);
                    } else {
                        responseStr = responseStr + chunk;
                    }
                }).on('end', () => {
                    responseStr = responseBufs.length > 0 ?
                        Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
                    console.log("responseStr:", responseStr);
                    resolve(JSON.parse(responseStr));
                });
            })
            .setTimeout(0)
            .on('error', (error) => {
                console.log("message:", error.message);
                reject();
            });
        request.end();
    });
}

export function setMSFConfig(MSFConfig) {
    msf = MSFConfig;
}

export function getAllNews(Promise) {
    return new Promise(function(resolve) {
        fs.readFile('public/json/ALLSports.json', "utf8", (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}

function testfunction() {
    return new Promise(function(resolve) {
        fs.readFile('results/full_game_schedule-mlb-2016-playoff.json', "utf8", (err, data) => {
            if (err) throw err;
            console.log("data here:", JSON.parse(data));
            resolve(List(JSON.parse(data).fullgameschedule.gameentry));
        });
    });
}


export function setCurrentNews(curr_feeds, newsList) {
    const list = List(newsList);
    curr_feeds = List(newsList);
    return Promise.resolve(curr_feeds);
}

export function getCurrentAllNews(curr_feeds) {
    console.log("in get all current news");
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/AllSports.json")));
    return Promise.resolve(curr_feeds);
}
export function getCurrentNBANews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NBA.json")));
    return Promise.resolve(curr_feeds);
}
export function getCurrentNFLNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NFL.json")));
    return Promise.resolve(curr_feeds);
}
export function getCurrentNHLNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NHL.json")));
    return Promise.resolve(curr_feeds);
}

export function getCurrentMLBNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/MLB.json")));
    return Promise.resolve(curr_feeds);
}

export function getScores(curr_feeds, game, season, forDate) {
    console.log("game here:", game);
    console.log("season here:", season);
    console.log("forDate here:", forDate);
    console.log("user name here:", process.env.MY_SF_LOGIN);
    var msf = new MySportsFeeds("1.0", true);
    msf.authenticate(process.env.MY_SF_LOGIN, process.env.MY_SF_PASSWORD);
    curr_feeds = new Promise((resolve, reject) => {
        msf.getData(game, season, 'scoreboard', 'json', { fordate: forDate }).then((data) => {
            return resolve(List(data.scoreboard.gameScore));
        }).catch(() => {
            return reject();
        });
    });
    return curr_feeds;
}

export function getSchedules(curr_feeds, game, season) {
    curr_feeds = new Promise((resolve, reject) => {
        msf.getData(game, season, 'full_game_schedule', 'json', { limit: 50 }).then((data) => {
            return resolve(List(data.fullgameschedule.gameentry));
        }).catch(() => {
            return reject();
        });
    });
    return curr_feeds;
}

export function getStandings(curr_feeds, game, season, teamStats, sortBy) {

    if (!sortBy || sortBy == 'default') {
        curr_feeds = new Promise((resolve, reject) => {
            return msf.getData(game, season, 'division_team_standings', 'json', { teamstats: teamStats }).then((data) => {
                console.log("data here");
                return resolve(List(data.divisionteamstandings.division));
            }).catch(() => {
                return reject();
            });
        });
    } else {
        curr_feeds = new Promise((resolve, reject) => {
            return msf.getData(game, season, 'division_team_standings', 'json', { teamstats: teamStats, sort: sortBy }).then((data) => {
                console.log("data here");
                return resolve(List(data.divisionteamstandings.division));
            }).catch(() => {
                return reject();
            });
        });
    }
    return curr_feeds;
}

export function getStats(curr_feeds, game, season, sortBy, playerStats) {
    console.log("playerStats here:", playerStats);
    console.log("sortBy here:", sortBy);
    console.log("game here:", game);
    console.log("season here:", season);
    console.log("offset here:", offset);
    console.log("limit here:", limit);
    if (sortBy != 'default') {
        curr_feeds = new Promise((resolve, reject) => {
            msf.getData(game, season, 'cumulative_player_stats', 'json', { playerstats: playerStats, sort: sortBy }).then((data) => {
                return resolve(List(data.cumulativeplayerstats.playerstatsentry));
            }).catch(() => {
                return reject();
            });
        });
    } else {


        curr_feeds = new Promise((resolve, reject) => {
            msf.getData(game, season, 'cumulative_player_stats', 'json', { playerstats: playerStats }).then((data) => {
                return resolve(List(data.cumulativeplayerstats.playerstatsentry));
            }).catch(() => {
                return reject();
            });
        });
    }
    return curr_feeds;
}