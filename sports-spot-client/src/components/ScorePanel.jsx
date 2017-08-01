import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
var chunk = require('lodash.chunk');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

export default class ScorePanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:{}};
        var d = new Date();
        this.currentDate = d.getFullYear()+"-"+d.getMonth()+ "-"+ d.getDate();
        this.week ="1";
        this.numQuarters =4;
    }
    getInitialState(){
        return {
        response: {}
        }
    }
    componentDidMount()
    {
        socket.on("curr_news",(data)=>{
                 this.setState({response:data});
                 this.setQuaters();
         })
    }
    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
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
      var startYear = 2016;
      var endYear = 2017;
      var options =[];
      for(var i=0;i<3;i++){
        var optionVal = startYear+"-"+endYear+'-regular';
        options.push(<option value ={optionVal}>{startYear} Season</option>)
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
        if(Object.keys(this.state.response).length ==0)
        {
                    return <div>Loading ....</div>;
        }
        const rowScores = chunk(this.props.scores,3);
        return  <div className = 'scorePanel'>
                    <div className ="sectionTitle">{this.getGameName()} Scoreboard</div> 
                    <div className="seasonPanel">
                        <select id ="seasonSelector" className="season-dropdown-menu" onChange={() => this.handleSeasonChange(this.props.getScores)}>{this.getseasonOptions()}</select>
                    </div>
            
                
                {
                    
                    rowScores.map((row) =>(
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
    }
}