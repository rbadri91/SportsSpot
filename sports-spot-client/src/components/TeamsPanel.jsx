import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
var chunk = require('lodash.chunk');
var Loader = require('react-loader');


// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});

class TeamsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:{},loaded:false};
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
         });
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
        console.log("array[0] here:",array[0]);    
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
        return "/"+this.game+"/teams/schedules/"+city+"_"+teamName;
    }
    getRosterPath(city,teamName){
        return "/"+this.game+"/teams/roster/"+city+"_"+teamName;
    }
    getStatsPath(city,teamName){
        return "/"+this.game+"/teams/stats"+city+"_"+teamName;
    }

    getTeamRow(team){
        var columns =[];
        columns.push(<td key={team.team.Name}>
            <a>{team.team.City} {team.team.Name}</a> &nbsp;&nbsp;
            <span className="setPosRight">
            <ScheduleItem team ={team.team.Name} city={team.team.City} location ={this.getSchedulePath(team.team.City,team.team.Name)} scheduleClick = {this.props.getSchedule}/> | 
            <Link to ={this.getStatsPath(team.team.City,team.team.Name)} >Stats</Link> | 
            <RosterItem location={this.getRosterPath(team.team.City,team.team.Name)} team ={team.team.Name} city={team.team.City} rosterClick={this.props.getRoster}/>
            </span></td>)

        return columns;
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
                                                this.standingsMainGroups.map((standingSubGroups) =>(
                                                    <td key ={this.getDivision(standingSubGroups[0]['@name'])} className="mainGroupSubSection">
                                                        <h3 className="main-section-title">{this.getDivision(standingSubGroups[0]['@name'])}</h3>
                                                         {
                                                            standingSubGroups.map((division) => (
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
            console.log("fullName here:",fullName);
            if(currPath.indexOf('nfl')!=-1){
                this.props.scheduleClick('nfl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('nhl')!=-1){
                this.props.scheduleClick('nhl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('mlb')!=-1){
                this.props.scheduleClick('mlb','2017-2018-regular',fullName);
            }else{
                this.props.scheduleClick('nba','2017-2018-regular',fullName);
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
            if(currPath.indexOf('nfl')!=-1){
                this.props.rosterClick('nfl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('nhl')!=-1){
                this.props.rosterClick('nhl','2017-2018-regular',fullName);
            }else if(currPath.indexOf('mlb')!=-1){
                this.props.rosterClick('mlb','2017-2018-regular',fullName);
            }else{
                this.props.rosterClick('nba','2017-2018-regular',fullName);
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