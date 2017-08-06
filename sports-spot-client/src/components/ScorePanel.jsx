import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
var chunk = require('lodash.chunk');
var Loader = require('react-loader');

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});

export default class ScorePanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:{}};
        var d = new Date();
        this.currentDate = d.getFullYear()+"-"+d.getMonth()+ "-"+ d.getDate();
        this.week ="1";
        this.numQuarters =4;
        this.rowScores =[];
    }
    getInitialState(){
        return {
        response: {},
        loaded:false
        }
    }
    componentDidMount()
    {
        socket.on("curr_news",(data)=>{
                 this.setState({response:data,loaded:true});
                 this.setQuaters();
                 this.setRowScores();
         })
    }
    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
    }

    setRowScores(){
        this.rowScores = chunk(this.state.response,3);
    }
    setQuaters(){
         var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
              this.numQuarters = 4;
        }else if(currPath.indexOf('nhl')!=-1){
                this.numQuarters = 4;
        }else if(currPath.indexOf('mlb')!=-1){
                this.numQuarters = 9;
        }else{
                this.numQuarters = 4;
        }
    }    
    getScores(){
        return this.props.scores ||[];
    }
    getQuaterScore(score,j){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
            return score.quarterSummary.quarter[j];
        }else if(currPath.indexOf('nhl')!=-1){
             return score.periodSummary.period[j];
        }else if(currPath.indexOf('mlb')!=-1){
             return score.inningSummary.inning[j];
        }else{
            return score.quarterSummary.quarter[j];
        }
    }
    handleSeasonChange(functionParam){
            var currPath = window.location.href;
            var season = document.getElementById("seasonSelector").value;
            if(currPath.indexOf('nfl')!=-1){
                    functionParam('nfl',season);
            }else if(currPath.indexOf('nhl')!=-1){
                functionParam('nhl',season);
            }else if(currPath.indexOf('mlb')!=-1){
                functionParam('mlb',season);
            }else{
                functionParam('nba',season);
            }
    }

     getseasonOptions(){
      var startYear = 2017;
      var endYear = 2018;
      var options =[];
      var season = ["2016-2017-regular","2017-playoff","2015-2016-regular","2016-playoff"];
      var seasonName = ["2016 Regular",'2017 Playoff','2015 Regular'];
      if(this.game==='mlb'){
          season = ["2017-regular","2017-playoff","2016-2017-regular","2016-playoff"];
          seasonName = ["2017 Regular",'2017 Playoff','2016 Regular'];
      }
      for(var i=0;i<season.length;i++){
        var optionVal = startYear+"-"+endYear+'-regular';
        options.push(<option value ={season[i]}>{seasonName[i]} Season</option>)
        startYear--;
        endYear--;
      }
      return options;
    }

    getQuaters(score){
        var location = window.location.href;
        if(location.indexOf('nhl')!=-1){
            return score.periodSummary.period.length;
        }else{
            return this.numQuarters;
        }
    }
    getGameName(){
    var game ='';
    var location = window.location.href;
    if(location.indexOf('nfl')!=-1){
            game = 'NFL';
        }else if(location.indexOf('nhl')!=-1){
             game = 'nhl';
        }else if(location.indexOf('mlb')!=-1){
             game = 'mlb';
        }else{
            game = 'nba';
        }
      return game;
  }
    render() {
        
        return  <Loader loaded={this.state.loaded}>
            <div className = 'scorePanel'>
                    <div className ="sectionTitle">{this.getGameName()} Scoreboard</div> 
                    <div className="seasonPanel">
                        <select id ="seasonSelector" className="season-dropdown-menu" onChange={() => this.handleSeasonChange(this.props.getScores)}>{this.getseasonOptions()}</select>
                    </div>
            
                
                {
                    
                    this.rowScores.map((row) =>(
                   <div className="ss-row scorecard-row">
                    <div className="ss-row-height">
                    {
                        row.map((score) => (
                        (score.game)?   
                        <div key ={score.game.ID} id= {score.game.ID} className ="scoreCardWrapper">
                            <div className ="score-innerWrapper">
                                        <div className="gamedetailBar">
                                            <div className="game-time-info">
                                                <span>{score.game.date} &nbsp;</span>
                                                <span>{score.game.time}</span>
                                            </div>
                                            <div className="gameLocation">
                                                {score.game.location}
                                            </div>
                                        </div>
                                        <div className="scorecard-info scoreSection">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            &nbsp;
                                                        </th>
                                                            {Array(this.getQuaters(score)).fill(1).map((el, i) =>
                                                                <th>{i+1}</th>
                                                            )}
                                                        <th>T</th>
                                                    </tr>
                                                </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className ="team-info">
                                                                <a className="team">{score.game.awayTeam.Name}</a>
                                                            </td>
                                                                {Array(this.getQuaters(score)).fill(1).map((el, j) =>
                                                                    <td className="scores">{this.getQuaterScore(score,j).awayScore}</td>
                                                                )}
                                                            <td>
                                                            {score.awayScore}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className ="team-info">
                                                                <a className="team">{score.game.homeTeam.Name}</a>
                                                            </td>
                                                                {Array(this.getQuaters(score)).fill(1).map((el, j) =>
                                                                    <td className="scores">{this.getQuaterScore(score,j).homeScore}</td>
                                                                )}
                                                            <td>
                                                            {score.homeScore}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                            </table>
                                        </div>
                            </div>
                        </div>:null
                      )) 
                    }
                  </div>
                   </div>
                ))
                }
            </div>
            </Loader>
    }
}