/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

import Pagination from './Pagination';


const socket = io(`${location.protocol}//${location.hostname}:8090`);

class StatsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            response:[],
            pageOfItems: []
        };
        this.title='';
        this.game='';
        this.statFor ='';
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    
    getInitialState(){
        return {
        response: []
        }
    }
    componentDidMount()
    {
        socket.once("curr_news",(data)=>{
                console.log("data here:",data);
                 this.setState({response:data});
         });
    }

    getTitle(){
        var location = window.location.href;
        var lastUnderscoreIndex = location.lastIndexOf("_");
        this.title = location.substring(lastUnderscoreIndex+1);
        var titleArr =[];
        titleArr.push(<td key="titleheader">{this.title}</td>);
        return titleArr;
    }

    getNBATeamOffenseHeader(){
        var headers =["TEAM","GP","PPG","FGM","FGA","PCT","3PM","3PA","PCT","FTM","FTA","PCT"];
        return headers;
    }
    getNBATeamReboundsHeader(){
        var headers =["TEAM","GP","OFF","DEF","DEFG","REB","REBG"];
        return headers;
    }
    getNBATeamBlockStealandTurnoverHeader(){
        var headers =["TEAM","GP","BLK","BPG","STL","STG","TO","TOG","TECH"];
        return headers;
    }

    getNBAPlayerOffenseHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","PPG","FGM","FGA","FG%","3PM","3PA","3P%","FTM","FTA","FT%"];
        return headers;
    }

    getNBAPlayerReboundsHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","OFF","ORPG","DEF","DRPG","REB","RPG"];
        return headers;
    }
    getNBAPlayerBlocksHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","BLK","BLKPG","PF","DRPG","REB","RPG"];
        return headers;
    }
    getNBAPlayerStealsHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","STL","STLPG","TO","TOPG","PF"];
        return headers;
    }

    getNBAPlayerTurnoversHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","TO","TOPG","PF","AST","ASTG"];
        return headers;
    }

    getNBAPlayerFoulsHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","PF","PFG","FLAG","FLAGG","TG","EJE"];
        return headers;
    }

    getNBAPlayerMinutesHeader(){
         var headers =["PLAYER","POS","TEAM","GP","MIN","MING"];
        return headers;
    }

    getNBAHeaders(){
        var headers =[];
        if(this.statFor==='team'){
                switch(this.title){
                    case "Points":
                    case "Assists":
                    case "Field Goals":
                    case "Free Throws":
                    case "3-Point Field Goals":
                        headers= this.getNBATeamOffenseHeader();
                        break;
                    case "Rebounds":
                        headers = this.getNBATeamReboundsHeader();
                        break;
                    case "Blocks":
                    case "Steals":
                    case "Turnovers":
                        headers = this.getNBATeamBlockStealandTurnoverHeader();
                        break;
                    default:
                        break;    
                }
        }else {
                switch(this.title){
                    case "Points":
                    case "Assists":
                    case "Field Goals":
                    case "Free Throws":
                    case "3-Point Field Goals":
                            headers = this.getNBAPlayerOffenseHeader();
                            break;
                    case "Rebounds":
                            headers = this.getNBAPlayerReboundsHeader();
                            break;
                    case "Blocks":
                            headers = this.getNBAPlayerBlocksHeader(); 
                            break;
                    case  "Steals":
                            headers = this.getNBAPlayerStealsHeader();
                            break; 
                    case  "Turnovers":
                            headers = this.getNBAPlayerTurnoversHeader();
                            break; 
                    case  "Fouls":
                            headers = this.getNBAPlayerFoulsHeader();
                            break; 
                    case  "Minutes":
                            headers = this.getNBAPlayerMinutesHeader();
                            break; 
                    default:
                        break;           
                }
        }  
            return headers;  
    }
    


    getTableHeader(){
        var currPath = window.location.pathname;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        this.statFor = subcontent.substring(0,subcontent.indexOf(this.title));

        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
        }else{
               this.game='nba';
        }
        if(this.game==='nba'){
            return this.getNBAHeaders();
        }
        return [];
    } 

    render() {
        if(this.state.response.length ===0)
        {
                        return <div>Loading ....</div>;
        }
        return <div className = 'statsPanel'>
                <div className="statsContent">
                    <table className="optionData">
                        <tbody>
                            <tr className="tableLabel">
                                    {this.getTitle()}
                            </tr>
                            <tr>
                                {this.getTableHeader().map((header,index) => (
                                       <th key={index+10000}>{header}</th> 
                                ))
                                }
                            </tr>
                             {this.state.pageOfItems.map(item =>
                                <tr key={item.player.ID}>
                                    <td>{item.player.FirstName}</td>
                                    <td>{item.player.Position}</td>
                                    <td>{item.team.Name}</td>
                                    <td>{item.stats.GamesPlayed}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    <Pagination items={this.state.response} onChangePage={this.onChangePage} />
                </div>
            </div>

    }
}

StatsPanel.propTypes = {
  getSchedule : PropTypes.func.isRequired,
  getStats: PropTypes.func.isRequired,
};


export default connect(null,actionCreators,null,{
  pure: false
})(StatsPanel);