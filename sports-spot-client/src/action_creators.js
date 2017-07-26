/*jshint esversion: 6 */

export function signUp(name, email, password) {
    return {
        meta: { remote: true },
        type: 'SIGNUP',
        name,
        email,
        password
    };
}

export function login(email, password) {
    return {
        meta: { remote: true },
        type: 'LOGIN',
        email,
        password
    };
}

export function setCurrentAllNews(curr_all_news) {
    console.log("curr_all_news here:", curr_all_news);
    return {
        type: 'SET_CURRENT_ALL_NEWS',
        curr_all_news
    };
}

export function setConnectionState(state, connected) {
    return {
        type: 'SET_CONNECTION_STATE',
        state,
        connected
    };
}