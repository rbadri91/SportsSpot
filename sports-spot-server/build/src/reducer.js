'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _core = require('./core');

var Promise = require('promise');

function reducer() {
    var curr_feeds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _core.CURRENT_FEEDS;
    var action = arguments[1];

    switch (action.type) {
        case 'SET_CURRENT_ALL_NEWS':
            return (0, _core.setCurrentNews)(curr_feeds, action.news);
        case 'GET_CURRENT_ALL_NEWS':
            return (0, _core.getCurrentAllNews)(curr_feeds);
        case 'GET_CURRENT_NBA_NEWS':
            return (0, _core.getCurrentNBANews)(curr_feeds);
        case 'GET_CURRENT_NHL_NEWS':
            return (0, _core.getCurrentNHLNews)(curr_feeds);
        case 'GET_CURRENT_NFL_NEWS':
            return (0, _core.getCurrentNFLNews)(curr_feeds);
        case 'GET_CURRENT_MLB_NEWS':
            return (0, _core.getCurrentMLBNews)(curr_feeds);
        case 'GET_SCORES':
            return (0, _core.getScores)(curr_feeds, action.gameType, action.season, action.forDate);
        case 'GET_SCHEDULES':
            return (0, _core.getSchedules)(curr_feeds, action.game, action.season, action.team);
        case 'GET_STANDINGS':
            return (0, _core.getStandings)(curr_feeds, action.game, action.season, action.teamStats, action.sortBy);
        case 'GET_STATS':
            return (0, _core.getStats)(curr_feeds, action.game, action.season, action.playerStats, action.sortBy);
        case 'GET_TEAMSTATS':
            return (0, _core.getTeamStats)(curr_feeds, action.game, action.season, action.teamStats, action.sortBy, action.statType);
        case 'GET_TEAMS':
            return (0, _core.getStandings)(curr_feeds, action.game, action.season, action.teamStats);
        case 'GET_ROSTER':
            return (0, _core.getRosterStats)(curr_feeds, action.game, action.season, action.team);
    }
    return Promise.resolve(curr_feeds);
}