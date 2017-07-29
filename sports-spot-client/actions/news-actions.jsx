
/*jshint esversion: 6 */

export function setCurrentNews(current_news) {
    return {
        type: 'SET_CURRENT_NEWS',
        current_news
    };
}

export function getCurrentNHLNews() {
    console.log("it comes here");
    return dispatch => {
        console.log("it comes inside dispatch");
        return getNewsJSON()
            .then(res => {
                dispatch(setCurrentNews(res));
            });
    };
}

function getNewsJSON() {
    return new Promise((resolve) => {
        fs.readFile('public/json/ALLSports.json', "utf8", (err, data) => {
            if (err) throw err;
            console.log("data here:", data);
            resolve(JSON.parse(data));
        });
    });
}