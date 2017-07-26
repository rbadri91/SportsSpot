/*jshint esversion: 6 */
import { List } from 'immutable';

export const CURRENT_ALL_NEWS = List();

export function getAllNews(http, apiKey, Promise) {
    var options = {
        host: 'newsapi.org',
        path: '/v1/articles?source=espn&sortBy=top&apiKey=0209284ae31c4c1aa9eaaeac754be74f'
    };
    console.log("in get all news");
    return new Promise(function(resolve, reject) {
        var request = http.request(options, function(res) {
            var data = '';
            console.log("comes inside data accumulation");

            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                console.log("data here:" + JSON.parse(data).articles);
                data = JSON.parse(data);
                resolve(data.articles);
            });
        });
        request.on('error', function(e) {
            console.log(e.message);
            reject();
        });
        request.end();
    });
}

export function setCurrentNews(curr_all_news, newsList) {
    const list = List(newsList);
    curr_all_news = list;
    return curr_all_news;
}