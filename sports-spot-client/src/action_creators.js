/*jshint esversion: 6 */

import NHLdata from '../public/json/NHL.json';
import MLBdata from '../public/json/MLB.json';
import NBAdata from '../public/json/NBA.json';
import NFLdata from '../public/json/NFL.json';

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


export function getCurrentAllNews() {
    return {
        meta: { remote: true },
        type: 'GET_CURRENT_ALL_NEWS'
    };
}

export function getCurrentNBANews() {
    console.log("it comes here");
    return dispatch => {
        console.log("it comes inside dispatch");
        return getNBANewsJSON()
            .then(response => {
                return response.json();
            }).then(function(data) {
                dispatch(setCurrentNews(data));
            });
    };
}

export function getCurrentNHLNews() {
    return dispatch => {
        return getNHLNewsJSON()
            .then(response => {
                return response.json();
            }).then(function(data) {
                dispatch(setCurrentNews(data));
            });
    };
}

function getNHLNewsJSON() {
    return fetch('json/NHL.json');
}

function getMLBNewsJSON() {
    return fetch('json/MLB.json');
}

function getNBANewsJSON() {
    return fetch('json/NBA.json');
}

function getNFLNewsJSON() {
    return fetch('json/NFL.json');
}

export function getCurrentNFLNews() {
    return dispatch => {
        return getNFLNewsJSON()
            .then(response => {
                return response.json();
            }).then(function(data) {
                dispatch(setCurrentNews(data));
            });
    };
}

export function getCurrentMLBNews() {
    return dispatch => {
        return getMLBNewsJSON()
            .then(response => {
                return response.json();
            }).then(function(data) {
                dispatch(setCurrentNews(data));
            });
    };
}

export function setConnectionState(state, connected) {
    return {
        type: 'SET_CONNECTION_STATE',
        state,
        connected
    };
}