import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
import TeamStatsPanel from './TeamStatsPanel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ButtonToolbar,SplitButton, DropdownButton,MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
var localforage = require('localforage');

class TeamStatsWrapper extends PureComponent{
    constructor(props){
        super(props);
        this.game ='';
        this.state={
            teamsList:false,
            teamName:''
        }
    }

    componentDidMount(){
        localforage.getItem("teams").then((teamsList) =>{
                this.setState({teamsList:teamsList});
        });
        this.setTeamName();
    }

    setTeamName(){
        var currPath = window.location.href;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subString1 = currPath.substring(0,lastSlashIndex);
        var prevSlashIndex = subString1.lastIndexOf("/");
        var teamName = subString1.substring(prevSlashIndex+1);
        console.log("teamName here in set team name:",teamName);
        this.setState({teamName:teamName});
    }

    getButtonContent(){
        var currPath = window.location.href;
         if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
              return ["offense","defense","special_teams"];
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
              return ["scoring","goaltending","penalties"];
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
               return ["Batting","Pitching","Fielding"];
        }else{
               this.game='nba';
               return ["offense","defense","miscellanious"];
        }   
    }
    getChecked(header){
        var currPath = window.location.href;
        if(currPath.indexOf(header)!=-1){
            return true;
        }
        return false;
    }
    handleStatTypeClick(header){
        this.season ="2017-2018-regular";
        if(this.game=='nba'){
           this.season ="2016-2017-regular";
        }
        this.props.getStats(header,'default',this.game,this.season,"default",this.state.teamName.replace(/_/g,"-"));
    }
    
    getLinkTo(header){
        var routerurl = "/"+this.game +'/teams/stats/'+this.state.teamName.replace(/ /g,"_")+"/player_"+header; 
        // var routerurl = "/player_"+header; 
        return routerurl;
    }

    getDefaultIndex(){
        var currPath = window.location.href;
        if(currPath.indexOf('offense')!==-1 || currPath.indexOf('scoring')!==-1 || currPath.indexOf('batting')!==-1){
            return 0;
        }else if(currPath.indexOf('defense')!==-1 || currPath.indexOf('goaltending')!==-1 || currPath.indexOf('pitching')!==-1 ){
            return 1;
        }else if(currPath.indexOf('penalties')!==-1 || currPath.indexOf('miscellanious')!==-1 || currPath.indexOf('special_teams')!==-1 || currPath.indexOf('fielding')!==-1){
            return 2;
        }
    }
    getTeamStatsHeader(){
        var header =[];
        console.log("in getTeamStatsHeader");
        header.push(<h2 key={this.props.team} className="statsHeader">{this.props.team.replace(/_/g," ")} Stats</h2>);
        return header;
    }
    getTeamLink(team){
        console.log("in getTeamLink");
        var url = "/"+ this.game+"/teams/stats/"+team.replace(/ /g,"_")+"/player_";
        if(this.game=='nba' || this.game=='nfl'){
            url+="offense";
        }else if(this.game=='nhl'){
            url+="scoring";
        }else if(this.game=='mlb'){
             url+="batting";
        }
        return url;    
    }
    getTeamListOptions(){
                var options =[];
                // options.push(<option key="default">Select Teams</option>);
                var teams = this.state.teamsList;
                 for(var i=0;i<teams.length;i++){
                        options.push(<LinkContainer to ={this.getTeamLink(teams[i])} key ={i}><MenuItem eventKey ={teams[i]} value ={teams[i]}>{teams[i]}</MenuItem></LinkContainer>);
                }
                return options;
    }
    handleTeamChange(teamSelected){

        var statFor="";
        if(this.game=='nba' || this.game=='nfl'){
            statFor="offense";
        }else if(this.game=='nhl'){
            statFor="scoring";
        }else if(this.game=='mlb'){
            statFor="batting";
        }
        
        console.log("teamSelected here:",teamSelected);
        this.props.getStats(statFor,'default',this.game,this.season,"default",teamSelected.replace(/ /g,"-"));
        var url = "/"+ this.game+"/teams/stats/"+teamSelected.replace(/ /g,"_")+"/player_";
        if(this.game==='nba' || this.game==='nfl'){
            url+="offense";
        }else if(this.game==='nhl'){
            url+="scoring";
        }else if(this.game==='mlb'){
             url+="batting";
        }
    }

    render(){
        return <div className ="teamStatsWrapper">
                <div className="teamHeaderWrapper">
                    <div className ="TeamStatsHeader">
                        {this.getTeamStatsHeader()}
                    </div>
                    <div className="teamsPanel">
                                <DropdownButton bsStyle='default' title='Select Team' id ="teamsList" onSelect={(evt) =>{this.handleTeamChange(evt)}} className="season-dropdown-menu setInline">{this.getTeamListOptions()}</DropdownButton>
                    </div>
                </div> 
                <Tabs defaultIndex={this.getDefaultIndex()}>
                    <TabList>{
                        this.getButtonContent().map((header,index) =>(
                            <Tab key={index}><Link to={this.getLinkTo(header)} onClick={() => this.handleStatTypeClick(header)}>{header}</Link></Tab>
                        ))
                    }
                    </TabList>
                
                    <TabPanel>
                         <StatsPanel {...this.props}/>  
                    </TabPanel>
                    <TabPanel>
                        <StatsPanel {...this.props}/>  
                    </TabPanel>
                    <TabPanel>
                            <StatsPanel {...this.props}/>  
                    </TabPanel>
                </Tabs>
                              
            </div>
    }
}

TeamStatsWrapper.propTypes = {
  getStats: PropTypes.func.isRequired,
};

export default connect(null,actionCreators,null,{
  pure: false
})(TeamStatsWrapper);