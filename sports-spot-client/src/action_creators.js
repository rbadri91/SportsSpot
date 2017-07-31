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
    return {
        type: 'SET_CURRENT_NEWS',
        current_news
    };
}

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

export function getScores(game = 'nhl', season = '2016-2017-regular', forDate = '20170101') {
    console.log("it comes to get scores");
    return {
        meta: { remote: true },
        type: 'GET_SCORES',
        gameType: game,
        season: season,
        forDate: forDate
    };
}

export function getSchedule(game = 'nhl', season = '2016-2017-regular') {
    console.log("it comes to getSchedule");
    return {
        meta: { remote: true },
        type: 'GET_SCHEDULES',
        game,
        season
    };
}

export function getStandings(game = 'nhl', season = '2016-2017-regular') {
    console.log("it comes to getStandings");
    return {
        meta: { remote: true },
        type: 'GET_STANDINGS',
        game,
        season
    };
}

export function getStats(game = 'nhl', season = '2016-2017-regular') {
    console.log("it comes to getStats");
    return {
        meta: { remote: true },
        type: 'GET_STATS',
        game,
        season
    };
}

export function getTeams(game = 'nhl', season = '2016-2017-regular') {
    return {
        meta: { remote: true },
        type: 'GET_TEAMS',
        game,
        season
    };
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