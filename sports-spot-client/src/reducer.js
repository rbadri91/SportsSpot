/*jshint esversion: 6 */
import { List, Map } from 'immutable';

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setCurrentAllNews(current_feeds, new_current_news) {
    current_feeds = new_current_news;
    return current_feeds;
}

function setCurrentNFLNews(current_feeds, new_current_nfl_news) {
    current_feeds = new_current_nfl_news;
    return current_feeds;
}

function setCurrentMLBNews(current_feeds, new_current_mlb_news) {
    current_feeds = new_current_mlb_news;
    return current_feeds;
}

function setCurrentNBANews(current_feeds, new_current_nba_news) {
    current_feeds = new_current_nba_news;
    return current_feeds;
}

function setCurrentNHLNews(current_feeds, new_current_nhl_news) {
    current_feeds = new_current_nhl_news;
    return current_feeds;
}
export default function(current_feeds = List(), action) {
    switch (action.type) {
        case 'SET_CURRENT_NEWS':
            return setCurrentAllNews(current_feeds, action.current_news);
        case 'SET_CURRENT_NFL_NEWS':
            return setCurrentNFLNews(current_feeds, action.curr_nfl_news);
        case 'SET_CURRENT_MLB_NEWS':
            return setCurrentMLBNews(current_feeds, action.curr_mlb_news);
        case 'SET_CURRENT_NBA_NEWS':
            return setCurrentNBANews(current_feeds, action.curr_nba_news);
        case 'SET_CURRENT_NHL_NEWS':
            return setCurrentNHLNews(current_feeds, action.curr_nhl_news);
    }

    return current_feeds;
}