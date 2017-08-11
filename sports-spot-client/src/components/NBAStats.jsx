import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actionCreators from '../action_creators';
import StatsPanel from './StatsPanel';
var Loader = require('react-loader');

class NBAStatsPage extends PureComponent{

    constructor(props){
        super(props);
    }

  getPlayerSortAbbreviation(name){
      if(name==='Points') return 'stats.PTS.D';
      else if(name==='Rebounds') return 'stats.REB/G.D';
      else if(name==='Fouls') return 'stats.F/G.D';
      else if(name==='Assists') return 'stats.AST/G.D';
      else if(name==='Blocks') return 'stats.BS/G.D';
      else if(name==='Minutes') return 'stats.MIN/G.D';
      else if(name==='Field Goals') return 'stats.FG%.D';
      else if(name==='Steals') return 'stats.STL/G.D';
      else if(name==='Free Throws') return 'stats.FT%.D';
      else if(name==='Turnovers') return 'stats.TOV/G.D';
      else if(name==='3-Point Field Goals') return 'stats.3P%.D';
  }

  getTeamSortAbbreviations(name){
      if(name==='Points') return 'stats.PTS/G.D';
      else if(name==='Opponent Points') return 'stats.PTSA/G';
      else if(name==='Rebounds') return 'stats.DREB/G.D';
      else if(name==='Assists') return 'stats.AST/G.D';
      else if(name==='Opponent Assists') return 'stats.AST/G';
      else if(name==='Blocks') return 'stats.BS/G.D';
      else if(name==='Field Goals') return 'stats.FG%.D';
      else if(name==='Opponent Field Goals') return 'stats.FG%';
      else if(name==='Steals') return 'stats.STL/G.D';
      else if(name==='Free Throws') return 'stats.FT%.D';
      else if(name==='Opponent Free Throws') return 'stats.FT%';
      else if(name==='Turnovers') return 'stats.TOV/G.D';
      else if(name==='3-Point Field Goals') return 'stats.3P%.D';
      else if(name==='Opponent 3-Point Field Goals') return 'stats.3P%';
      else if(name==='Fouls') return 'stats.F/G.D';
  }
  handleLinkClick(functionParam,statType,orderBy,game){
      functionParam(statType,orderBy,game);
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
      var location = '/nba/showStatPanel/'+statsFor+"_"+data1;
      if(statsFor==='player'){
           columns.push(<td key ={data1}><Link to={location} onClick={() => this.props.getStats('offense',data1_sortAbb,'nba')}>{data1}</Link></td>);
      }else{
          columns.push(<td key ={data1}><Link to={location} onClick={() => this.props.getTeamStats('offense',data1_sortAbb,'nba')}>{data1}</Link></td>);
      }
    }else{
      columns.push(<td>&nbsp;</td>);
    }
    
    if(data2!=''){
      var location = '/nba/showStatPanel/'+statsFor+"_"+data2;
      if(statsFor==='player'){
         columns.push(<td key ={data2}><Link to={location} onClick={() => this.props.getStats('defence',data2_sortAbb,'nba')}>{data2}</Link></td>);
      }else{
         columns.push(<td key ={data2}><Link to={location} onClick={() => this.props.getTeamStats('offense_opp',data2_sortAbb,'nba')}>{data2}</Link></td>);
      }
    }else{
      columns.push(<td>&nbsp;</td>);
    }

    if(data3!=''){
      var location = '/nba/showStatPanel/'+statsFor+"_"+data3;
      if(statsFor==='player'){
        columns.push(<td key ={data3}><Link to={location} onClick={() => this.props.getStats('miscellaneous',data3_sortAbb,'nba')}>{data3}</Link></td>);
      }else{
        columns.push(<td key ={data3}><Link to={location} onClick={() => this.props.getTeamStats('',data3_sortAbb,'nba')}>{data3}</Link></td>);
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
                                     <td>OFFENSE</td>
                                     <td>DEFENCE</td>
                                     <td>MISCELLANEOUS</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('player','Points','Rebounds','Fouls',this.props.getStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('player','Assists','Blocks','Minutes',this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','Field Goals','Steals','',this.props.getStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('player','Free Throws','Turnovers','',this.props.getStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('player','3-Point Field Goals','','',this.props.getStats)}
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
                                     <td>OFFENSE (TEAM)</td>
                                     <td>OFFENSE (OPPONENT)</td>
                                     <td>DEFENSE</td>
                                     </tr>
                                     <tr className="even">
                                       {this.constructColumn('team','Points','Opponent Points','Rebounds',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Assists','Opponent Assists','Blocks',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','Field Goals','Opponent Field Goals','Steals',this.props.getTeamStats)}
                                     </tr>
                                      <tr className="odd">
                                        {this.constructColumn('team','Free Throws','Opponent Free Throws','Turnovers',this.props.getTeamStats)}
                                     </tr>
                                     <tr className="even">
                                        {this.constructColumn('team','3-Point Field Goals','Opponent 3-Point Field Goals','',this.props.getStandings)}
                                     </tr>
                                     <tr className="odd">
                                        {this.constructColumn('team','Fouls','','',this.props.getTeamStats)}
                                     </tr>
                                  </tbody>
                            </table>
                        </div>
                </div> 
              </div>
            </div>
  }
};

function mapNBAStatsToProps(curr_stats){
  return {
    stats:curr_stats
  }
}

NBAStatsPage.propTypes = {
  getStats : PropTypes.func.isRequired,
  getTeamStats: PropTypes.func.isRequired,
};

export const NBAStatsPageContainer = connect(mapNBAStatsToProps,actionCreators)(NBAStatsPage);