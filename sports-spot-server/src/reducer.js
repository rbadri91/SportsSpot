import { CURRENT_ALL_NEWS, setCurrentNews } from './core';
export default function reducer(curr_all_news = CURRENT_ALL_NEWS, action) {
    switch (action.type) {
        case 'SET_CURRENT_ALL_NEWS':
            return setCurrentNews(curr_all_news, action.news);
    }
}