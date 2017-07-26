/*jshint esversion: 6 */
import { List, Map } from 'immutable';

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setCurrentAllNews(curr_all_news, new_current_news) {
    console.log("new_current_news here:", new_current_news);
    return curr_all_news.concat(new_current_news);
}

export default function(current_news = List(), action) {
    switch (action.type) {
        case 'SET_CURRENT_ALL_NEWS':
            return setCurrentAllNews(current_news, action.curr_all_news);
    }

    return current_news;
}