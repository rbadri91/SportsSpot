import { CURRENT_NEWS, setCurrentNews, getCurrentAllNews, getCurrentNBANews, getCurrentNFLNews, getCurrentNHLNews, getCurrentMLBNews } from './core';


export default function reducer(curr_news = CURRENT_NEWS, action) {
    switch (action.type) {
        case 'SET_CURRENT_ALL_NEWS':
            return setCurrentNews(curr_news, action.news);
        case 'GET_CURRENT_ALL_NEWS':
            return getCurrentAllNews(curr_news);
        case 'GET_CURRENT_NBA_NEWS':
            return getCurrentNBANews(curr_news);
        case 'GET_CURRENT_NHL_NEWS':
            return getCurrentNHLNews(curr_news);
        case 'GET_CURRENT_NFL_NEWS':
            return getCurrentNFLNews(curr_news);
        case 'GET_CURRENT_MLB_NEWS':
            return getCurrentMLBNews(curr_news);
    }
}