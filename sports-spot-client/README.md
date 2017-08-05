#SportsSpot
A Full fledged React/Redux app which provides live sports news and other sports feeds such as stats, schedules,scorecard,standing and team specific information of 4 major leagues NHL,NFL,NBA,and MLB. Websockets are user for communication between the sever and the client. Node.js is used as backend. 

The news feeds are pulled by Rest calls to EventRegistry API. The sports feeds are provided by My Sportsfeed API.Comunication to the rest API happends via Promise . This ensures that the server emits an event only when the promise is resolved. The componentDidMount function of react is utilized to make sure that the component renders only after the information arrives form the server. This is done by listening to the websockets. The applymiddle ware module of react makes sure that only wanteed requests are sent to the server. The data obtained from the my sportsfeed API is cached as a json file for some time in order to avoid unnecessary requsts.

The app performs the following functions:
Provides Latest News
Provided scorecard information upto recently concluded games.
Provided schedules of upcoming and past matches
Provided Team standings,
Provides various stats about players and team in various aspects to know information about leaders in various categories in the respective games.
Provided team specific schedules stats and roster information

