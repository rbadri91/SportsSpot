import { CURRENT_FEEDS, setCurrentNews, getCurrentAllNews, getCurrentNBANews, getCurrentNFLNews, getCurrentNHLNews, getCurrentMLBNews, getScores, getSchedules, getStandings, getStats } from './core';

var Promise = require('promise');

export default function reducer(curr_feeds = CURRENT_FEEDS, action) {
    switch (action.type) {
        case 'SET_CURRENT_ALL_NEWS':
            return setCurrentNews(curr_feeds, action.news);
        case 'GET_CURRENT_ALL_NEWS':
            return getCurrentAllNews(curr_feeds);
        case 'GET_CURRENT_NBA_NEWS':
            return getCurrentNBANews(curr_feeds);
        case 'GET_CURRENT_NHL_NEWS':
            return getCurrentNHLNews(curr_feeds);
        case 'GET_CURRENT_NFL_NEWS':
            return getCurrentNFLNews(curr_feeds);
        case 'GET_CURRENT_MLB_NEWS':
            return getCurrentMLBNews(curr_feeds);
        case 'GET_SCORES':
            return getScores(curr_feeds, action.gameType, action.season, action.forDate);
        case 'GET_SCHEDULES':
            return getSchedules(curr_feeds, action.game, action.season);
        case 'GET_STANDINGS':
            return getStandings(curr_feeds, action.game, action.season, action.teamStats, action.sortBy);
        case 'GET_STATS':
            return getStats(curr_feeds, action.game, action.season, action.sortBy, action.playerStats);
    }
    return Promise.resolve(curr_feeds);
}