import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
var Loader = require('react-loader');

class MLBStatsPage extends PureComponent{

  constructor(props){
        super(props);
    }

  getSortAbbreviation(name){
      if(name==='Batting Average') return 'stats.AVG.D';
      else if(name==='ERA') return 'stats.ERA.D';
      else if(name==='Fielding Percentage') return 'stats.FPCT.D';
      else if(name==='Home Runs') return 'stats.HR.D';
      else if(name==='Wins') return 'stats.W.D';
      else if(name==='Double Plays') return 'stats.FDP.D';
      else if(name==='Runs Batted In') return 'stats.RBI.D';
      else if(name==='Saves') return 'stats.SV.D';
      else if(name==='Errors') return 'stats.E';
      else if(name==='Hits') return 'stats.H.D';
      else if(name==='Strikeouts') return 'stats.SO.D';
      else if(name==='Total Chances') return 'stats.TC.D';
      else if(name==='On-Base Percentage') return 'stats.OBP.D';
      else if(name==='WHIP') return 'stats.WHIP.D';
      else if(name==='Outfield Assists') return 'stats.A.D';
      else if(name==='Runs Scored') return 'stats.R.D';
      else if(name==='Runs Scored') return 'stats.R.D';

  }
  handleLinkClick(functionParam,statType,orderBy,game){
      functionParam(game,undefined,undefined,orderBy,statType);
  }

  constructColumn(statsFor,data1,data2,data3,functionParam){
    var columns =[];
    var data1_sortAbb= this.getSortAbbreviation(data1);
    var data2_sortAbb= this.getSortAbbreviation(data2);
    var data3_sortAbb= this.getSortAbbreviation(data3);
    var location1 = '/mlb/showStatPanel/'+statsFor+"_"+data1.trim();
    var location2 = '/mlb/showStatPanel/'+statsFor+"_"+data2.trim();
    var location3 = '/mlb/showStatPanel/'+statsFor+"_"+data3.trim();
    if(statsFor==='player'){
      columns.push(<td><Link to={location1} onClick={() => this.props.getStats('batting',data1_sortAbb,'mlb')}>{data1}</Link></td>);
      columns.push(<td><Link to={location2} onClick={() => this.props.getStats('pitching',data2_sortAbb,'mlb')}>{data2}</Link></td>);
      columns.push(<td><Link to={location3} onClick={() => this.props.getStats('fielding',data3_sortAbb,'mlb')}>{data3}</Link></td>);
    }else{
      columns.push(<td><Link to={location1} onClick={() => this.props.getTeamStats('batting',data1_sortAbb,'mlb')}>{data1}</Link></td>);
      columns.push(<td><Link to={location2} onClick={() => this.props.getTeamStats('pitching',data2_sortAbb,'mlb')}>{data2}</Link></td>);
      columns.push(<td><Link to={location3} onClick={() => this.props.getTeamStats('fielding',data3_sortAbb,'mlb')}>{data3}</Link></td>);
    }
    return columns;
  }
  render() {
          return <div className="schedule-holder">
            <div className="schedule-content-wrapper">
                <div className="sorttable-content-innerwrapper">
                      <div className="sort-container sort-table">
                            <div className="sort-header">
                              <h4 className="main-section-title">Sortables</h4>
                            </div>
                            <div className="sorttable-content">
                              <table className= "optionData">
                                  <tbody>
                                    <tr className = "tableSectionHeader">
                                      <td colSpan ={2}>Entire MLB</td>
                                      </tr>
                                      <tr className = "tableLabel">
                                        <td>Players</td>
                                        <td>Teams</td>
                                      </tr>
                                      <tr className="tableContent">
                                        <td>
                                          <Link to='/mlb/showStatPanel/player_Batting' onClick={() => this.props.getStats('batting','stats.AVG.D','mlb')}>Batting</Link>
                                          <br/>
                                          <Link to='/mlb/showStatPanel/player_Pitching' onClick={() => this.props.getStats('pitching','stats.W.D','mlb')}>Pitching</Link>
                                          <br/>
                                          <Link to='/mlb/showStatPanel/player_Fielding' onClick={() => this.props.getStats('fielding','stats.FPCT.D','mlb')}>Fielding</Link>
                                        </td>
                                        <td>
                                          <Link to='/mlb/showStatPanel/team_Batting' onClick={() => this.props.getTeamStats('batting','stats.AVG.D','mlb')}>Batting</Link>
                                          <br/>
                                          <Link to='/mlb/showStatPanel/team_Pitching' onClick={() => this.props.getTeamStats('pitching','stats.ERA.D','mlb')}>Pitching</Link>
                                          <br/>
                                          <Link to='/mlb/showStatPanel/team_Fielding' onClick={() => this.props.getTeamStats('fielding','stats.FPCT.D','mlb')}>Fielding</Link>
                                        </td>
                                        </tr>
                                    </tbody>
                              </table>
                            </div>
                        </div>
                        <div className="PlayerStatsWrapper">
                          <table className="optionData">
                                <tbody>
                                  <tr className="tableTitle">
                                    <td colSpan={3}>Player Stats</td>
                                   </tr>
                                   <tr className="tableSectionHeader">
                                     <td>Batting</td>
                                     <td>Pitching</td>
                                     <td>Fielding</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('player','Batting Average','ERA','Fielding Percentage',this.props.getStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('player','Home Runs','Wins','Double Plays',this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','Runs Batted In','Saves','Errors',this.props.getStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('player','Hits','Strikeouts','Total Chances',this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','On-Base Percentage','WHIP','Outfield Assists',this.props.getStats)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                        <div className="TeamStatsWrapper">
                          <table className="optionData">
                                <tbody>
                                  <tr className="tableTitle">
                                    <td colSpan={3}>Team Stats</td>
                                   </tr>
                                   <tr className="tableSectionHeader">
                                     <td>Batting</td>
                                     <td>Pitching</td>
                                     <td>Fielding</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('team','Runs Scored','ERA','Errors',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Home Runs','Wins','Double Plays',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','Runs Batted In','Saves','Fielding Percentage',this.props.getTeamStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('team','Hits','Strikeouts','Total Chances',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','On-Base Percentage','WHIP','Outfield Assists',this.props.getTeamStats)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                </div> 
              </div>
            </div>
  }
};

function mapMLBStatsToProps(curr_stats){
  return {
    stats:curr_stats
  }
}

MLBStatsPage.propTypes = {
  getStats : PropTypes.func.isRequired,
  getTeamStats: PropTypes.func.isRequired,
};

export const MLBStatsPageContainer = connect(mapMLBStatsToProps,actionCreators)(MLBStatsPage);