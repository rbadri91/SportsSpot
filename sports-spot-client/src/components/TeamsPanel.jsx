import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
var chunk = require('lodash.chunk');
var Loader = require('react-loader');
var localforage = require('localforage');


var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});
// var socket = io.connect('http://localhost:8090');

class TeamsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:{},loaded:false};
        this.teamsMainGroups =[];
        this.teamsList =[];
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
                console.log("data here:",data);
                 this.setState({response:data,loaded:true});
                 this.setTeamsMainGroups();
         });
    }

    componentWillUnmount(){
        this.state.loaded = false;
        socket.removeAllListeners("curr_news");
    }

    setTeamsMainGroups(){
        this.teamsMainGroups = this.chunk(this.state.response);
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

    getTeamHeader(){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
        }else{
               this.game='nba';
        }
        return this.game+" Teams";
    }

    getDivision(divName){
        var slashIndex = divName.indexOf('/');
        return divName.substring(0,slashIndex);
    }
    getSubDivision(divName){
        var slashIndex = divName.indexOf('/');
        return divName.substring(slashIndex+1);
    }

    getSchedulePath(city,teamName){
        return "/"+this.game+"/teams/schedules/"+city.replace(/ /g,"_")+"_"+teamName.replace(/ /g,"_");
    }
    getRosterPath(city,teamName){
        return "/"+this.game+"/teams/roster/"+city.replace(/ /g,"_")+"_"+teamName.replace(/ /g,"_");
    }
    getStatsPath(city,teamName){
        var navUrl = '/'+this.game+'/teams/stats/'+city.replace(/ /g,"_")+"_"+teamName.replace(/ /g,"_");
        if(this.game === 'nba'){
                    navUrl +='/player_offense';
        }else if(this.game === 'nfl'){
                    navUrl +='/player_offense';
        }else if(this.game === 'nhl'){
                    navUrl +='/player_scoring';
        }else if(this.game === 'mlb'){
                    navUrl +='/player_batting';
        }
        return navUrl;
    }

    getTeamRow(team){
        var columns =[];

        this.teamsList.push(team.team.City +" "+ team.team.Name);

        // localforage.getItem("teams").then(function(teamsList) {
        //     if(!teamsList){
        //         teamsList =[];
        //     }
        //     teamsList.push(team.team.City +" "+ team.team.Name);
        //     localforage.setItem("teams",teamsList);
        // }
        columns.push(<td key={team.team.Name}>
            <a>{team.team.City} {team.team.Name}</a> &nbsp;&nbsp;
            <span className="setPosRight">
            <ScheduleItem location ={this.getSchedulePath(team.team.City,team.team.Name)} team ={team.team.Name} city={team.team.City} scheduleClick = {this.props.getSchedule}/> | 
            <StatsItem location = {this.getStatsPath(team.team.City,team.team.Name)} team ={team.team.Name} city={team.team.City} statsClick ={this.props.getStats}>Stats</StatsItem> | 
            <RosterItem location={this.getRosterPath(team.team.City,team.team.Name)} team ={team.team.Name} city={team.team.City} rosterClick={this.props.getRoster}/>
            </span></td>)

        return columns;
    }
    setTeamList(){
        localforage.setItem("teams",this.teamsList);
    }

    render() {
            return <div>
                <Loader loaded={this.state.loaded}>
                    <div className="sportHeader feature">{this.getTeamHeader()}</div>
                    { 
                        
                                <table className="multispans">
                                    <tbody>
                                        <tr className="mainGroupRow">
                                           {
                                                this.teamsMainGroups.map((teamsSubGroups) =>(
                                                    <td key ={this.getDivision(teamsSubGroups[0]['@name'])} className="mainGroupSubSection">
                                                        <h3 className="main-section-title">{this.getDivision(teamsSubGroups[0]['@name'])}</h3>
                                                         {
                                                            teamsSubGroups.map((division) => (
                                                                <table key ={this.getSubDivision(division['@name'])} className="outputData teamSectionMain">
                                                                    <thead>
                                                                        <tr><th className="sub-section-title setTitleHeight">{this.getSubDivision(division['@name'])}</th></tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        { division.teamentry.map((team,index) =>(
                                                                            <tr key ={team.team.ID} className={"ss-row "+ (index%2==0 ?'even':'odd')}>
                                                                                {this.getTeamRow(team)}
                                                                             </tr>   
                                                                           ))
                                                                        }   
                                                                    </tbody>
                                                                </table>
                                                           )) 
                                                         }      
                                                    </td>
                                                )) 
                                            }                   
                                         </tr> 
                                         {
                                             this.setTeamList()
                                         }  
                                    </tbody>
                                 </table> 
                    }
                </Loader>
            </div>;
    }
}

class ScheduleItem extends PureComponent{
        constructor(props){
            super(props);
            this._onClick = this._onClick.bind(this);
        }
        render() {
            return (
                <Link to = {this.props.location} onClick={this._onClick}>Schedule</Link>
            );
        }
        _onClick() {
             var currPath = window.location.href;
            var fullName = this.props.city+"-"+this.props.team;
            console.log("fullName here;",fullName);
            if(currPath.indexOf('nfl')!=-1){
                this.props.scheduleClick('nfl','2017-2018-regular',undefined,fullName);
            }else if(currPath.indexOf('nhl')!=-1){
                this.props.scheduleClick('nhl','2017-2018-regular',undefined,fullName);
            }else if(currPath.indexOf('mlb')!=-1){
                this.props.scheduleClick('mlb','2017-2018-regular',undefined,fullName);
            }else{
                this.props.scheduleClick('nba','2017-playoff',undefined,fullName);
            }
        }
}

class RosterItem extends PureComponent{
        constructor(props){
            super(props);
            this._onClick = this._onClick.bind(this);
        }
        render() {
            return (
                <Link to = {this.props.location} onClick={this._onClick}>Roster</Link>
            );
        }
        _onClick() {
             var currPath = window.location.href;
            var fullName = this.props.city+"-"+this.props.team;
            console.log("fullName here for roster:",fullName);
            if(currPath.indexOf('nfl')!=-1){
                this.props.rosterClick('nfl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('nhl')!=-1){
                this.props.rosterClick('nhl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('mlb')!=-1){
                this.props.rosterClick('mlb','2016-2017-regular',fullName);
            }else{
                this.props.rosterClick('nba','2017-2018-regular',fullName);
            }
        }
}

class StatsItem extends PureComponent{
        constructor(props){
            super(props);
            this._onClick = this._onClick.bind(this);
        }
        render() {
            return (
                <Link to = {this.props.location} onClick={this._onClick}>Stats</Link>
            );
        }
        _onClick() {
             var currPath = window.location.href;
            var fullName = this.props.city+"-"+this.props.team;
            console.log("fullName here:",fullName);
            if(currPath.indexOf('nfl')!==-1){
                this.props.statsClick('offense','default','nfl','2017-2018-regular','default',fullName);
            }else if(currPath.indexOf('nhl')!==-1){
                this.props.statsClick('scoring','default','nhl','2017-2018-regular','default',fullName);
            }else if(currPath.indexOf('mlb')!==-1){
                this.props.statsClick('batting','stats.Batting-AVG.D','mlb','2016-2017-regular','default',fullName);
            }else{
                this.props.statsClick('offense','default','nba','2017-2018-regular','default',fullName);
            }
        }
}

TeamsPanel.propTypes = {
  getSchedule : PropTypes.func.isRequired,
  getStats: PropTypes.func.isRequired,
  getRoster:PropTypes.func.isRequired
};

export default connect(null,actionCreators,null,{
  pure: false
})(TeamsPanel);