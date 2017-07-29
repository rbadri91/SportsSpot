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
export function setCurrentNews(current_news) {
    console.log("set current news to dispatch");
    return {
        type: 'SET_CURRENT_NEWS',
        current_news
    };
}


// export function getTestNFLNews() {
//     console.log("in getTestNFLNews");
//     return {
//         meta: { remote: true },
//         type: 'GET_CURRENT_NFL_NEWS'
//     };
// }
// export function getCurrentNBANews() {
//     console.log("it comes here");
//     return dispatch => {
//         console.log("it comes inside dispatch");
//         return getNBANewsJSON()
//             .then(response => {
//                 return response.json();
//             }).then(function(data) {
//                 dispatch(setCurrentNews(data));
//             });
//     };
// }

// export function getCurrentNHLNews() {
//     return dispatch => {
//         return getNHLNewsJSON()
//             .then(response => {
//                 return response.json();
//             }).then(function(data) {
//                 dispatch(setCurrentNews(data));
//             });
//     };
// }

// function getNHLNewsJSON() {
//     return fetch('json/NHL.json');
// }

// function getMLBNewsJSON() {
//     return fetch('json/MLB.json');
// }

// function getNBANewsJSON() {
//     return fetch('json/NBA.json');
// }

// function getNFLNewsJSON() {
//     return fetch('json/NFL.json');
// }

export function getCurrentALLNews() {
    console.log("in getCurrentAllNews");
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_ALL_NEWS'
    };
}

export function getCurrentNFLNews() {
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_NFL_NEWS'
    };
}

export function getCurrentMLBNews() {
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_MLB_NEWS'
    };
}

export function getCurrentNBANews() {
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_NBA_NEWS'
    };
}

export function getCurrentNHLNews() {
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_NHL_NEWS'
    };
}

// export function getCurrentMLBNews() {
//     return dispatch => {
//         return getMLBNewsJSON()
//             .then(response => {
//                 return response.json();
//             }).then(function(data) {
//                 dispatch(setCurrentNews(data));
//             });
//     };
// }

function getScores(game, season) {
    return {
        type: 'GET_SCORES',
        game,
        season
    }
}

function getSchedule(game, season) {
    return {
        type: 'GET_SCHEDULES',
        game,
        season
    }
}

function getStandings(game, season) {
    return {
        type: 'GET_STANDINGS',
        game,
        season
    }
}

function getStats(game, season) {
    return {
        type: 'GET_STATS',
        game,
        season
    }
}

function getScoresCallback(game = 'nhl', season = '2017-playoff') {
    return dispatch => {
        dispatch(getScores(game, season));
    }
}

function getScheduleCallback(game = 'nhl', season = '2017-playoff') {
    return dispatch => {
        dispatch(getSchedule(game, season));
    }
}

function getStandingsCallback(game = 'nhl', season = '2017-playoff') {
    return dispatch => {
        dispatch(getStandings(game, season));
    }
}

function getStatsCallback(game = 'nhl', season = '2017-playoff') {
    return dispatch => {
        dispatch(getStats(game, season));
    }
}


export function setConnectionState(state, connected) {
    return {
        type: 'SET_CONNECTION_STATE',
        state,
        connected
    };
}