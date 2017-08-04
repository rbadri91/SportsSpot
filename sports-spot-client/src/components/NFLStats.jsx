import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NFLStatsPage extends PureComponent{

  getPlayerSortAbbreviation(name){
      if(name==='Passing') return 'stats.Yds.D';
      else if(name==='Tackles') return 'stats.Total.D';
      else if(name==='Field Goals') return 'stats.Made.D';
      else if(name==='Rushing') return 'stats.Yds.D';
      else if(name==='Sacks') return 'stats.Sacks.D';
      else if(name==='Extra Points') return 'stats.XpMade.D';
      else if(name==='RecYards') return 'stats.Yds.D';
      else if(name==='Interceptions') return 'stats.PD.D';
      else if(name==='Punting') return 'stats.NetYds.D';
      else if(name==='Touchdowns') return 'stats.TD.D';
      else if(name==='Fumbles Forced') return 'stats.Forced.D';
      else if(name==='Kickoff Returns') return 'stats.Yds.D';
      else if(name==='Scoring') return 'stats.FgAndXpPts.D';
      else if(name==='Punt Returns') return 'stats.RetYds.D';
      else if(name==='Total QBR') return 'stats.QBRating.D';
  }

  getTeamSortAbbreviations(name){
      if(name==='Passing Offense') return 'stats.NetYds.D';
      else if(name==='Passing Defense') return 'stats.Int.D';
      else if(name==='Field Goals') return 'stats.Made.D';
      else if(name==='Rushing Offense') return 'stats.Yds.D';
      else if(name==='Rushing Defense') return 'stats.Rushing.D';
      else if(name==='Kickoffs') return 'stats.KO%.D';
      else if(name==='Opponent Kickoffs') return 'stats.Ret.D';
      else if(name==='Receiving Offense') return 'stats.Yds.D';
      else if(name==='Receiving Defense') return 'stats.Yds.D';
      else if(name==='Punting') return 'stats.NetYds.D';
      else if(name==='Opponent Punting') return 'stats.NetYds.D';
      else if(name==='Scoring Offense') return 'stats.PF.D';
      else if(name==='Scoring Defense') return 'stats.PA';
      else if(name==='Punt Returns') return 'stats.Ret.D';
      else if(name==='Opponent Punt Returns') return 'stats.Ret';
      else if(name==='Total Offense') return 'stats.OffenseYds.D';
      else if(name==='Total Defense') return 'stats.PD.D';
      else if(name==='Kick Returns') return 'stats.Yds.D';
      else if(name==='Opponent Kick Returns') return 'stats.Yds.D';
      else if(name==='Sacks / Interceptions Offense') return 'stats.SackYds.D';     
      else if(name==='Sacks / Interceptions Defense') return 'stats.Sacks.D';
      else if(name==='Fumbles Forced') return 'stats.Forced.D';
      else if(name==='Fumbles Lost') return 'stats.Lost.D';
      
  }
  handleLinkClick(functionParam,statType,orderBy,game){
      console.log("statType here:",statType);
      console.log("game here:",game);
      functionParam(game,undefined,undefined,orderBy,statType);
  }

  constructColumn(statsFor,data1,data2,data3,data4,functionParam){
    var columns =[],data1_sortAbb,data2_sortAbb,data3_sortAbb,data4_sortAbb;

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
    if(data4){
        data4_sortAbb= this.getTeamSortAbbreviations(data4);
    }
    if(data1!=''){
      var location1 = '/nfl/showStatPanel/'+statsFor+"_"+data1;
      if(statsFor==='player'){
        columns.push(<td><Link to={location1} onClick={() => this.props.getStats('offence',data1_sortAbb,'nfl')}>{data1}</Link></td>);
      }else{
         columns.push(<td><Link to={location1} onClick={() => this.props.getTeamStats('offence',data1_sortAbb,'nfl')}>{data1}</Link></td>);
      }
    }else{
      columns.push(<td>&nbsp;</td>);
    }
    
    if(data2!=''){
      var location2 = '/nfl/showStatPanel/'+statsFor+"_"+data2;
      if(statsFor==='player'){
          columns.push(<td><Link to={location2} onClick={() => this.props.getStats('defence',data2_sortAbb,'nfl')}>{data2}</Link></td>);
      }else{
          columns.push(<td><Link to={location2} onClick={() => this.props.getTeamStats('defence',data2_sortAbb,'nfl')}>{data2}</Link></td>);
      }
      }else{
      columns.push(<td>&nbsp;</td>);
    }

    if(data3!=''){
        var location3 = '/nfl/showStatPanel/'+statsFor+"_"+data3;
        if(statsFor==='player'){
            columns.push(<td><Link to={location3} onClick={() => this.props.getStats('special_teams',data3_sortAbb,'nfl')}>{data3}</Link></td>);
        }else{
            columns.push(<td><Link to={location3} onClick={() => this.props.getTeamStats('special_teams',data3_sortAbb,'nfl')}>{data3}</Link></td>);
        }
    }else{
       columns.push(<td>&nbsp;</td>);
    }
    
    if(data4){
      var location4 = '/nfl/showStatPanel/'+statsFor+"_"+data4;
      columns.push(<td><Link to={location4} onClick={() => this.props.getTeamStats('sp_teams_opp',data4_sortAbb,'nfl')}>{data4}</Link></td>);
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
                                     <td>OFFENSE</td>
                                     <td>DEFENSE</td>
                                     <td>SPECIAL TEAMS</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('player','Passing','Tackles','Field Goals',null,this.props.getStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('player','Rushing','Sacks','Extra Points',null,this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','Receiving','Interceptions','Punting',null,this.props.getStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('player','Touchdowns','Fumbles Forced','Kickoff Returns',null,this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','Scoring','','Punt Returns',null,this.props.getStats)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                        <div className="TeamStatsWrapper">
                          <table className="optionData">
                                <tbody>
                                  <tr className="tableTitle">
                                    <td colSpan={4}>Team Stats</td>
                                   </tr>
                                   <tr className="tableSectionHeader">
                                     <td>OFFENSE</td>
                                     <td>DEFENSE</td>
                                     <td>SPECIAL TEAMS</td>
                                     <td>OPPONENT SPECIAL TEAMS</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('team','Passing Offense','Passing Defense','Field Goals','Opponent Field Goals',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Rushing Offense','Rushing Defense','Kickoffs','Opponent Kickoffs',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','Receiving Offense','Receiving Defense','Punting','Opponent Punting',this.props.getTeamStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('team','Scoring Offense','Scoring Defense','Punt Returns','Opponent Punt Returns',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','Total Offense','Total Defense','Kick Returns','Opponent Kick Returns',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Sacks / Interceptions','Sacks / Interceptions Defense','Fumbles Forced','Fumbles Lost',this.props.getTeamStats)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                </div> 
              </div>
            </div>
  }
};

function mapNFLStatsToProps(curr_stats){
  return {
    stats:curr_stats
  }
}

NFLStatsPage.propTypes = {
  getStats : PropTypes.func.isRequired,
  getTeamStats: PropTypes.func.isRequired,
};

export const NFLStatsPageContainer = connect(mapNFLStatsToProps,actionCreators)(NFLStatsPage);