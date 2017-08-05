import { CURRENT_FEEDS, setCurrentNews, getCurrentAllNews, getCurrentNBANews, getCurrentNFLNews, getCurrentNHLNews, getCurrentMLBNews, getScores, getSchedules, getStandings, getStats, getTeamStats, getRosterStats } from './core';

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
            console.log("action.team here:", action.team);
            return getSchedules(curr_feeds, action.game, action.season, action.team);
        case 'GET_STANDINGS':
            return getStandings(curr_feeds, action.game, action.season, action.teamStats, action.sortBy);
        case 'GET_STATS':
            return getStats(curr_feeds, action.game, action.season, action.playerStats, action.sortBy);
        case 'GET_TEAMSTATS':
            return getTeamStats(curr_feeds, action.game, action.season, action.teamStats, action.sortBy, action.statType);
        case 'GET_TEAMS':
            return getStandings(curr_feeds, action.game, action.season, action.teamStats);
        case 'GET_ROSTER':
            return getRosterStats(curr_feeds, action.game, action.season, action.team);
    }
    return Promise.resolve(curr_feeds);
}