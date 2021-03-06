/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
var Loader = require('react-loader');

var socket = io.connect('https://sportsspot.herokuapp.com:443', {secure: true});
// var socket = io.connect('http://localhost:8090');

export default class StandingsPanel extends PureComponent{
    
    constructor(props){
        super(props);
        this.state={response:{}};
        this.division ="";
        this.subDivision="";
        this.standingsMainGroups =[];
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
                 this.setStandingsMainGroups();
         })
    }
    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
    }

    setStandingsMainGroups(){
        this.standingsMainGroups = this.chunk(this.state.response);
    }

    chunk(array){
        if(!array || !array[0] || !array[0]["@name"]) return [];
        var result = [], 
            subResult=[],
            i=0,
            len =array.length;
        var currentDivision  = array[0]["@name"].substring(0,array[0]["@name"].indexOf('/'));   
        do{
            var division = array[i]["@name"].substring(0,array[0]["@name"].indexOf('/'))
            if(currentDivision === division|| i===0){
                subResult.push(array[i]);
            }else{
                result.push(subResult);
                subResult =[];
                subResult.push(array[i]);
                currentDivision = division;
            }
            i++;
        }while (i<len);

        result.push(subResult);
        return result;
    }

    getStandings(){
        return this.props.standings ||[];
    }

    getDivision(divName){
        var slashIndex = divName.indexOf('/');
        return divName.substring(0,slashIndex);
    }
    getSubDivision(divName){
        var slashIndex = divName.indexOf('/');
        return divName.substring(slashIndex+1);
    }

    getMLBHeaders(){
        var headers =[];
        headers.push(<th>Team</th>);
        headers.push(<th>W</th>);
        headers.push(<th>L</th>);
        headers.push(<th>PCT.</th>);
        headers.push(<th>GB</th>);
        headers.push(<th>RS</th>);
        headers.push(<th>RA</th>);
        headers.push(<th>Diff</th>);
        return headers;
    }
    getNBAHeaders(){
        var headers =[];
        headers.push(<th>Team</th>);
        headers.push(<th>W</th>);
        headers.push(<th>L</th>);
        headers.push(<th>PCT.</th>);
        headers.push(<th>GB</th>);
        return headers;
    }
    getNHLHeaders(){
        var headers =[];
        headers.push(<th>Team</th>);
        headers.push(<th>W</th>);
        headers.push(<th>L</th>);
        headers.push(<th>OTW</th>);
        headers.push(<th>OTL</th>);
        headers.push(<th>PTS</th>);
        headers.push(<th>GF</th>);
        headers.push(<th>GA</th>);
        return headers;
    }
     getNFLHeaders(){
        var headers =[];
        headers.push(<th>Team</th>);
        headers.push(<th>W</th>);
        headers.push(<th>L</th>);
        headers.push(<th>T</th>);
        headers.push(<th>PCT.</th>);
        headers.push(<th>PF</th>);
        headers.push(<th>PA</th>);
        headers.push(<th>Diff</th>);
        return headers;
    }

    getHeaders(){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
              return this.getNFLHeaders();
        }else if(currPath.indexOf('nhl')!=-1){
              return this.getNHLHeaders();
        }else if(currPath.indexOf('mlb')!=-1){
               return this.getMLBHeaders();
        }else{
               return this.getNBAHeaders();
        }
    }

    getNBAStats(team){
        var stats =[];
        stats.push(<td>{team.team.Name}</td>);
        stats.push(<td>{team.stats.Wins['#text']}</td>);
        stats.push(<td>{team.stats.Losses['#text']}</td>);
        stats.push(<td>{team.stats.WinPct['#text']}</td>);
        stats.push(<td>{team.stats.GamesBack['#text']}</td>);
        return stats;
    }
    getNHLStats(team){
        var stats =[];
        stats.push(<td>{team.team.Name}</td>);
        stats.push(<td>{(team.stats.Wins)?team.stats.Wins['#text']:0}</td>);
        stats.push(<td>{(team.stats.Losses)?team.stats.Losses['#text']:0}</td>);
        stats.push(<td>{(team.stats.OvertimeWins)?team.stats.OvertimeWins['#text']:0}</td>);
        stats.push(<td>{(team.stats.OvertimeLosses)?team.stats.OvertimeLosses['#text']:0}</td>);
        stats.push(<td>{(team.stats.Points)?team.stats.Points['#text']:0}</td>);
        stats.push(<td>{(team.stats.GoalsFor)?team.stats.GoalsFor['#text']:0}</td>);
        stats.push(<td>{(team.stats.GoalsAgainst)?team.stats.GoalsAgainst['#text']:0}</td>);
        return stats;
    }
    getNFLStats(team){
        var stats =[];
        stats.push(<td>{team.team.Name}</td>);
        stats.push(<td>{team.stats.Wins['#text']}</td>);
        stats.push(<td>{team.stats.Losses['#text']}</td>);
        stats.push(<td>{team.stats.Ties['#text']}</td>);
        stats.push(<td>{team.stats.WinPct['#text']}</td>);
        stats.push(<td>{team.stats.PointsFor['#text']}</td>);
        stats.push(<td>{team.stats.PointsAgainst['#text']}</td>);
        stats.push(<td>{team.stats.PointDifferential['#text']}</td>);
        return stats;
    }
    getMLBStats(team){
        var stats =[];
        stats.push(<td>{team.team.Name}</td>);
        stats.push(<td>{team.stats.Wins['#text']}</td>);
        stats.push(<td>{team.stats.Losses['#text']}</td>);
        stats.push(<td>{team.stats.WinPct['#text']}</td>);
        stats.push(<td>{team.stats.GamesBack['#text']}</td>);
        stats.push(<td>{team.stats.RunsFor['#text']}</td>);
        stats.push(<td>{team.stats.RunsAgainst['#text']}</td>);
        stats.push(<td>{team.stats.RunDifferential['#text']}</td>);
        return stats;
    }
    getTeamStats(team){

        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
              return this.getNFLStats(team);
        }else if(currPath.indexOf('nhl')!=-1){
              return this.getNHLStats(team);
        }else if(currPath.indexOf('mlb')!=-1){
               return this.getMLBStats(team);
        }else{
               return this.getNBAStats(team);
        }

        
    }

    render(){
        return  <div className ="standingsPanel">
            <Loader loaded={this.state.loaded}>
                        {
                            this.standingsMainGroups.map((standingSubGroups) =>(
                            <div key ={this.getDivision(standingSubGroups[0]['@name'])} className ='standingWrapper'>    
                                <h3 className="main-section-title">{this.getDivision(standingSubGroups[0]['@name'])}</h3>
                            {
                                standingSubGroups.map((division) => (
                                    <div key ={this.getSubDivision(division['@name'])} className ='content-innerWrapper'>  
                                        <h4 className ="sub-section-title">{this.getSubDivision(division['@name'])}</h4>
                                        <table className="contentTable">
                                            <thead>
                                                <tr>{this.getHeaders()}</tr>
                                            </thead>
                                           <tbody>
                                              { division.teamentry.map((team,index) =>(
                                                  <tr key ={team.team.ID} className={"ss-row "+ (index%2==0 ?'even':'odd')}>
                                                    {this.getTeamStats(team)}
                                                   </tr>   
                                                ))
                                              }
                                           </tbody>    
                                        </table> 
                                    </div>    
                                ))
                            }
                            </div>
                        
                        ))
                        }
                    </Loader>
                    </div>
                    
    }
}