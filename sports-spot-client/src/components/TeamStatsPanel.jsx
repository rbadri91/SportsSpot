import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
var chunk = require('lodash.chunk');
var Loader = require('react-loader');


class TeamsInfoWrapper extends PureComponent{
    constructor(props){
        super(props);
    }
    getNBAOptions(team){
        var options=[];
        var location1= "/nba/teams/stats/offense/"+team;
        var location2= "/nba/teams/stats/defence/"+team;
        var location3= "/nba/teams/stats/miscellanious/"+team;
        options.push(<li><Link key={location1} to={location1}>Offense</Link></li>);
        options.push(<li><Link key={location2} to={location2}>Defence</Link></li>);
        options.push(<li><Link key={location3} to={location3}>Miscellanious</Link></li>);
        return options;
    }
    getNFLOptions(team){
        var options=[];
        var location1= "/nba/teams/stats/offense/"+team;
        var location2= "/nba/teams/stats/defence/"+team;
        var location3= "/nba/teams/stats/special_teams/"+team;
        options.push(<li><Link key={location1} to={location1}>Offense</Link></li>);
        options.push(<li><Link key={location2} to={location2}>Defence</Link></li>);
        options.push(<li><Link key={location3} to={location3}>Miscellanious</Link></li>);
        return options;
    }
    getMLBOptions(team){
        var options=[];
        var location1= "/nba/teams/stats/batting/"+team;
        var location2= "/nba/teams/stats/pitching/"+team;
        var location3= "/nba/teams/stats/fielding/"+team;
        options.push(<li><Link key={location1} to={location1}>Batting</Link></li>);
        options.push(<li><Link key={location2} to={location2}>Pitching</Link></li>);
        options.push(<li><Link key={location3} to={location3}>Fielding</Link></li>);
        return options;
    }
    getNHLOptions(team){
        var options=[];
        var location1= "/nba/teams/stats/scoring/"+team;
        var location2= "/nba/teams/stats/goaltending/"+team;
        var location3= "/nba/teams/stats/penalties/"+team;
        options.push(<li><Link key={location1} to={location1}>Scoring</Link></li>);
        options.push(<li><Link key={location2} to={location2}>Goaltending</Link></li>);
        options.push(<li><Link key={location3} to={location3}>Penalties</Link></li>);
        return options;
    }

    getStatsOptions(){
        var currPath = window.location.href;
         var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
              return this.getNFLOptions(subcontent);
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
              return this.getNHLOptions(subcontent);
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
               return this.getMLBOptions(subcontent);
        }else{
               this.game='nba';
               return this.getNBAOptions(subcontent);
        }


    }
    render(){
        return <div className ="TeamStatsWrapper">
                <div className='teamStatsOption'>
                    <ul className="statsTabs">
                        {this.getStatsOptions()}
                    </ul>
                </div>
                <StatsPanel {...this.props}/>
        </div>
    }
}