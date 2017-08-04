import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
var Loader = require('react-loader');

class NHLStatsPage extends PureComponent{

  getPlayerSortAbbreviation(name){
      if(name==='Goals') return 'stats.G.D';
      else if(name==='Wins') return 'stats.W.D';
      else if(name==='Penalty Minutes') return 'stats.PIM.D';
      else if(name==='Assists') return 'stats.A.D';
      else if(name==='Goals Against Avg.') return 'stats.GAA';
      else if(name==='Points') return 'stats.Pts.D';
      else if(name==='Save Percentage') return 'stats.Sv%.D';
      else if(name==='Penalty Minutes/Game') return 'stats.PIM/G.D';
      else if(name==='Goals Breakdown') return 'stats.TD.D';
  }

  getTeamSortAbbreviations(name){
      if(name==='Points') return 'stats.Pts.D';
      else if(name==='Power Play Goals') return 'stats.PPG.D';
      else if(name==='Penalty Minutes') return 'stats.PIM.D';
      else if(name==='Goals Breakdown - Offensive') return 'stats.GF.D';
      else if(name==='Goals Against') return 'stats.GA.D';
      else if(name==='Penalty Minutes/Game') return 'stats.PIM.D';
      else if(name==='Penalty Kill Percentage') return 'stats.PK%.D';
      else if(name==='Shots') return 'stats.Sh.D';
  }
  handleLinkClick(functionParam,statType,orderBy,game){
      console.log("statType here:",statType);
      console.log("game here:",game);
      console.log("orderBy here:",orderBy);
      functionParam(game,undefined,undefined,orderBy,statType);
  }

  constructColumn(statsFor,data1,data2,data3,functionParam){
    var columns =[],data1_sortAbb,data2_sortAbb,data3_sortAbb;

    if(data1!=''){
        if(statsFor=='player'){
            data1_sortAbb= this.getPlayerSortAbbreviation(data1);
        }else{
           data1_sortAbb= this.getTeamSortAbbreviations(data1);
        }
    }
    
    if(data2!=''){
       if(statsFor==='player'){
         data2_sortAbb= this.getPlayerSortAbbreviation(data2);
        }else{
          data2_sortAbb= this.getTeamSortAbbreviations(data2);
        }
    }
    if(data3!=''){
      if(statsFor==='team'){
          data3_sortAbb= this.getPlayerSortAbbreviation(data3);
      }else{
          data3_sortAbb= this.getTeamSortAbbreviations(data3);
      }    
    }

    if(data1!=''){
      var location1 = '/nhl/showStatPanel/'+statsFor+"_"+data1;
      if(statsFor==='player'){
          columns.push(<td><Link to={location1} onClick={() => this.props.getStats('scoring',data1_sortAbb,'nhl')}>{data1}</Link></td>);
      }else{
          columns.push(<td><Link to={location1} onClick={() => this.props.getTeamStats('scoring',data1_sortAbb,'nhl')}>{data1}</Link></td>);
      }
    }else{
      columns.push(<td>&nbsp;</td>);
    }
    
    if(data2!=''){
       var location2 = '/nhl/showStatPanel/'+statsFor+"_"+data2;
       if(statsFor==='player'){
            columns.push(<td><Link to={location2} onClick={() => this.props.getStats('goaltending',data2_sortAbb,'nhl')}>{data2}</Link></td>);
       }else{
           columns.push(<td><Link to={location2} onClick={() => this.props.getTeamStats('goaltending',data2_sortAbb,'nhl')}>{data2}</Link></td>);
       }
    }else{
      columns.push(<td>&nbsp;</td>);
    }

    if(data3!=''){
        var location3 = '/nhl/showStatPanel/'+statsFor+"_"+data3;
        if(statsFor==='player'){
              columns.push(<td><Link to={location3} onClick={() => this.props.getStats('penalities',data3_sortAbb,'nhl')}>{data3}</Link></td>);
        }else{
              columns.push(<td><Link to={location3} onClick={() => this.props.getTeamStats('penalities',data3_sortAbb,'nhl')}>{data3}</Link></td>);
        }
      }else{
       columns.push(<td>&nbsp;</td>);
    }
    return columns;
  }
  render() {
          return <div className="schedule-holder">
            <div className="schedule-content-wrapper">
                <div className="sorttable-content-innerwrapper">
                        <div className="PlayerStatsWrapper">
                          <table className="optionData">
                                <tbody>
                                  <tr className="tableTitle">
                                    <td colSpan={3}>Player Stats</td>
                                   </tr>
                                   <tr className="tableSectionHeader">
                                     <td>SCORING</td>
                                     <td>GOALTENDING</td>
                                     <td>PENALTIES</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('player','Goals','Wins','Penalty Minutes',this.props.getStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('player','Assists','Goals Against Avg.','Penalty Minutes/Game',this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','Points','Save Percentage','',this.props.getStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('player','Goals Breakdown','','',this.props.getStats)}
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
                                     <td>SCORING</td>
                                     <td>SPECIAL TEAMS</td>
                                     <td>PENALTIES</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('team','Points','Power Play Goals','Penalty Minutes',this.props.getStandings)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Goals Breakdown - Offensive','Goals Against','Penalty Minutes/Game',this.props.getStandings)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','Shots','','Penalty Kill Percentage',this.props.getStandings)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                </div> 
              </div>
            </div>
  }
};

function mapNHLStatsToProps(curr_stats){
  return {
    stats:curr_stats
  }
}

NHLStatsPage.propTypes = {
  getStats : PropTypes.func.isRequired,
  getTeamStats: PropTypes.func.isRequired,
};

export const NHLStatsPageContainer = connect(mapNHLStatsToProps,actionCreators)(NHLStatsPage);