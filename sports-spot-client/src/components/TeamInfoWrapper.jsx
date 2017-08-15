import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
import TeamStatsWrapper from './TeamStatsWrapper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RosterPanel from './RosterPanel.jsx';
import 'react-tabs/style/react-tabs.css';
import SchedulePanel from './SchedulePanel';

class TeamsInfoWrapper extends PureComponent{

    constructor(props){
        super(props);
        this.game='';
        this.team = '';
        this.handleRosterClick = this.handleRosterClick.bind(this);
        this.handleStatsClick = this.handleStatsClick.bind(this);
        this.handleSchedulesClick = this.handleSchedulesClick.bind(this);
        var currPath = window.location.href;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        if(currPath.indexOf('stats')!==-1){
            var subPath = currPath.substring(0,lastSlashIndex);
            var lastSlashIndex2 = subPath.lastIndexOf("/");
            subcontent = subPath.substring(lastSlashIndex2+1);
        }
        this.team = subcontent;
        
        console.log("team here in team info wrapper:",this.team);
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
        }else{
               this.game='nba';
        }   
    }  
    handleRosterClick(){
        console.log("in handleRosterClick");
        this.props.getRoster(this.game,undefined,this.team.replace(/_/g,"-"));
    }
    handleStatsClick(){
        console.log("in handleStatsClick");
        console.log("team here in stats click:",this.team);
        if(this.game=='mlb'){
            this.props.getStats('batting','stats.Batting-AVG.D',this.game,undefined,'default',this.team.replace(/_/g,"-"));
        }else if(this.game=='nhl'){
            this.props.getStats('scoring','stats.G.D',this.game,undefined,'default',this.team.replace(/_/g,"-"));
        }else if(this.game=='nfl'){
            this.props.getStats('offense','stats.Passing-Yds.D',this.game,undefined,'default',this.team.replace(/_/g,"-"));
        }else if(this.game=='nba'){
            this.props.getStats('offense','stats.PTS.D',this.game,undefined,'default',this.team.replace(/_/g,"-"));
        }
        
    }
     handleSchedulesClick(){
        this.props.getSchedule(this.game,undefined,undefined,this.team.replace(/_/g,"-"));
    }
    getDefaultIndex(){
        this.setTeamName();
        console.log("in getDefaultIndex");
        var currPath = window.location.href;
        if(currPath.indexOf('roster')!==-1){
            return 2;
        }else if(currPath.indexOf('schedules')!==-1){
            return 1;
        }else if(currPath.indexOf('stats')!==-1){
            return 0;
        }
    }
    getLinkTo(navTo){
            var navUrl = '/'+this.game+'/teams/'+navTo+"/"+this.team;
            if(navTo === 'stats'){
                if(this.game === 'nba'){
                    navUrl +='/player_offense';
                }else if(this.game === 'nfl'){
                    navUrl +='/player_offense';
                }else if(this.game === 'nhl'){
                    navUrl +='/player_scoring';
                }else if(this.game === 'mlb'){
                    navUrl +='/player_Batting';
                }
            }
            return navUrl;
    }
    setTeamName(){
        console.log("in set team name");
        var currPath = window.location.href;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        if(currPath.indexOf('stats')!==-1){
            var subPath = currPath.substring(0,lastSlashIndex);
            var lastSlashIndex2 = subPath.lastIndexOf("/");
            subcontent = subPath.substring(lastSlashIndex2+1);
        }
        this.team = subcontent;
    }
    render() {

        return <div className="TeamInfoContainer">
                <Tabs defaultIndex={this.getDefaultIndex()}>
                    <TabList>
                    <Tab><Link to={this.getLinkTo('stats')} onClick={() => this.handleStatsClick(this.props.getStats)}>Stats</Link></Tab>
                    <Tab><Link to={this.getLinkTo('schedules')} onClick={() => this.handleSchedulesClick(this.props.getSchedule)}>Schedules</Link></Tab>
                    <Tab><Link to={this.getLinkTo('roster')} onClick={() => this.handleRosterClick(this.props.getRoster)}>Roster</Link></Tab>
                    </TabList>
                
                    <TabPanel>
                         <TeamStatsWrapper team ={this.team} {...this.props}/>
                    </TabPanel>
                    <TabPanel>
                        <SchedulePanel {...this.props} />
                    </TabPanel>
                    <TabPanel>
                            <RosterPanel {...this.props} />
                    </TabPanel>
                </Tabs>
        </div>
    }
}

TeamsInfoWrapper.propTypes = {
  getSchedule : PropTypes.func.isRequired,
  getStats : PropTypes.func.isRequired,
  getRoster : PropTypes.func.isRequired,
};
export default connect(null,actionCreators,null,{
  pure: false
})(TeamsInfoWrapper);