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

export function getScores(game = 'nhl', season = 'default', forDate = 'default') {
    if (season == 'default') {
        season = '2016-2017-regular';
    }
    if (forDate == 'default') {
        if (season == '2016-2017-regular') {
            if (game == 'mlb') forDate = '20160404';
            else if (game == 'nba') forDate = '20161025';
            else if (game == 'nfl') forDate = '20160908';
            else forDate = '20161012';
        } else if (season == '2015-2016-regular') {
            if (game == 'mlb') forDate = '20150404';
            else if (game == 'nba') forDate = '20151027';
            else if (game == 'nfl') forDate = '20150910';
            else forDate = '20151007';
        } else if (season == '2014-2015-regular') {
            if (game == 'mlb') forDate = '20140404';
            else if (game == 'nba') forDate = '20141028';
            else if (game == 'nfl') forDate = '20140904';
            else forDate = '20141008';
        } else forDate = '20170101';
    }
    return {
        meta: { remote: true },
        type: 'GET_SCORES',
        gameType: game,
        season: season,
        forDate: forDate
    };
}

export function getSchedule(game = 'nhl', season = '2016-2017-regular') {
    return {
        meta: { remote: true },
        type: 'GET_SCHEDULES',
        game,
        season
    };
}

export function getStandings(game = 'nhl', season = '2016-2017-regular', teamStats = 'default') {
    if (teamStats === 'default') {
        if (game === 'nhl') teamStats = 'W,L,OTW,OTL,PTS,GF,GA';
        else if (game === 'nba') teamStats = 'W,L,Win %,GB';
        else if (game === 'mlb') teamStats = 'W,L,GB,Win %,RF,RA,RUNDIFF';
        else teamStats = 'W,L,T,Win %,PF,PA,PTDIFF';
    }

    return {
        meta: { remote: true },
        type: 'GET_STANDINGS',
        game,
        season,
        teamStats
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