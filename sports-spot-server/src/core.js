/*jshint esversion: 6 */
import { List } from 'immutable';
var fs = require("fs");

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
        path: '/v1.1/pull/' + game + '/' + seasonName + '/' + reqData + '.json' + (forDate) ? '? fordate = ' + forDate : '',
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

export function getAllNews(http, apiKey, Promise) {
    return new Promise(function(resolve) {
        fs.readFile('public/json/ALLSports.json', "utf8", (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}


export function setCurrentNews(curr_feeds, newsList) {
    const list = List(newsList);
    curr_feeds = List(newsList);
    return curr_feeds;
}

export function getCurrentAllNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/AllSports.json")));
    return curr_feeds;
}
export function getCurrentNBANews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NBA.json")));
    return curr_feeds;
}
export function getCurrentNFLNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NFL.json")));
    return curr_feeds;
}
export function getCurrentNHLNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/NHL.json")));
    return curr_feeds;
}

export function getCurrentMLBNews(curr_feeds) {
    curr_feeds = List(JSON.parse(fs.readFileSync("public/json/MLB.json")));
    return curr_feeds;
}

export function getScores(curr_feeds, game, season) {

}