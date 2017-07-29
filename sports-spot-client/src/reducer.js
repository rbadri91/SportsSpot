/*jshint esversion: 6 */
import { List, Map } from 'immutable';

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setCurrentAllNews(curr_all_news, new_current_news) {
    curr_all_news = new_current_news;
    return curr_all_news;
}

function setCurrentNFLNews(curr_nfl_news, new_current_nfl_news) {
    curr_nfl_news = new_current_nfl_news;
    return curr_nfl_news;
}

function setCurrentMLBNews(curr_mlb_news, new_current_mlb_news) {
    curr_mlb_news = new_current_mlb_news;
    return curr_mlb_news;
}

function setCurrentNBANews(curr_nba_news, new_current_nba_news) {
    curr_nba_news = new_current_nba_news;
    return curr_nba_news;
}

function setCurrentNHLNews(curr_nhl_news, new_current_nhl_news) {
    curr_nhl_news = new_current_nhl_news;
    return curr_nhl_news;
}
export default function(current_news = List(), action) {
    switch (action.type) {
        case 'SET_CURRENT_NEWS':
            return setCurrentAllNews(current_news, action.current_news);
        case 'SET_CURRENT_NFL_NEWS':
            return setCurrentNFLNews(current_news, action.curr_nfl_news);
        case 'SET_CURRENT_MLB_NEWS':
            return setCurrentMLBNews(current_news, action.curr_mlb_news);
        case 'SET_CURRENT_NBA_NEWS':
            return setCurrentNBANews(current_news, action.curr_nba_news);
        case 'SET_CURRENT_NHL_NEWS':
            return setCurrentNHLNews(current_news, action.curr_nhl_news);
    }

    return current_news;
}