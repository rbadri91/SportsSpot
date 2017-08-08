/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';
import Pagination from './Pagination';
var Loader = require('react-loader');

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});
// var socket = io.connect('http://localhost:8090');

class StatsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            response:[],
            pageOfItems: [],
            responseReceived:false
        };
        this.title='';
        this.game='';
        this.statFor ='';
        this.tableHeaders =[];
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    
    getInitialState(){
        return {
        response: [],
        loaded: false
        }
    }
    componentDidMount()
    {
        socket.on("curr_news",(data)=>{
                 this.setState({response:data,responseReceived:true,loaded: true});
         });
    }

    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
         this.setState({loaded:false});
    }

    getTitle(){
        var location = window.location.href;
        var lastUnderscoreIndex = location.lastIndexOf("_");
        this.title = location.substring(lastUnderscoreIndex+1);
        var titleArr =[];
        titleArr.push(<td colSpan ={this.getTableHeaderCount()} key="titleheader">{this.title}</td>);
        return titleArr;
    }

    getTableHeaders(){
        return this.tableHeaders;
    }

    getNBATeamOffenseHeader(){
        var headers =["TEAM","GP","PPG","AST/G","FGM","FGA","FGPCT","3PM","3PA","3P%","FTM","FTA","FTPCT"];
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

    getNBATeamFoulsHeader(){
        var header =["TEAM","G","PF","PF/G","FF1","TF","EJE"];
        return header;
    }

    getNBAPerTeamOffenseHeader(){
         var headers =["PLAYER","POS","GP","MPG","PTS","FGM","FGA","FG%","3PM","3PA","3P%","FTM","FTA","FT%"];
        return headers;
    }

    getNBATeamDefenseHeader(){
        var headers =["PLAYER","POS","GP","MPG","ORPG","DRPG","RPG","BLKPG","STLPG","TOPG","AST","ASTG","PF"];
        return headers;
    }
    getNBATeamMiscHeader(){
        var headers =["PLAYER","POS","GP","MPG","PFG","FLAGG","TG","EJE"];
        return headers;
    }

    getNBAPlayerOffenseHeader(){
        var headers =["PLAYER","POS","TEAM","GP","MPG","PTS","FGM","FGA","FG%","3PM","3PA","3P%","FTM","FTA","FT%"];
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

    getNBARowContent(items){
        var columns =[];
        if(this.statFor==='player'){
                switch(this.title){
                    case "Points":
                    case "Assists":
                    case "Field Goals":
                    case "Free Throws":
                    case "3-Point Field Goals":
                    columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],items.stats.Pts["#text"],
                        items.stats.FgMadePerGame["#text"],items.stats.FgAttPerGame["#text"],items.stats.FgPct["#text"],
                        items.stats.Fg3PtMadePerGame["#text"],items.stats.Fg3PtAttPerGame["#text"],items.stats.Fg3PtPct["#text"],
                        items.stats.FtMadePerGame["#text"],items.stats.FtAttPerGame["#text"],items.stats.FtPct["#text"]];
                        break;
                    case "Rebounds":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],
                        items.stats.OffReb["#text"],items.stats.OffRebPerGame["#text"],
                        items.stats.DefReb["#text"],items.stats.DefRebPerGame["#text"],
                        items.stats.Reb["#text"],items.stats.RebPerGame["#text"]];
                        break;
                    case "Blocks":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],
                        items.stats.Blk["#text"],items.stats.BlkPerGame["#text"],items.stats.FoulPers["#text"],
                        items.stats.DefRebPerGame["#text"],items.stats.Reb["#text"],items.stats.RebPerGame["#text"]];
                        break;
                    case "Steals":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],
                        items.stats.Stl["#text"],items.stats.StlPerGame["#text"],items.stats.Tov["#text"],items.stats.TovPerGame["#text"],
                        items.stats.FoulPers["#text"]];
                        break;
                    case  "Turnovers":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],
                        items.stats.Tov["#text"],items.stats.TovPerGame["#text"],items.stats.FoulPers["#text"],
                        items.stats.Ast["#text"],items.stats.AstPerGame["#text"]];
                        break;
                    case  "Fouls":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],
                        items.stats.FoulPers["#text"],items.stats.FoulsPerGame["#text"],
                        items.stats.FoulFlag1["#text"],items.stats.FoulFlag1PerGame["#text"],
                        items.stats.FoulTech["#text"],items.stats.Ejections["#text"]];
                        break;
                    case "Minutes":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.MinSeconds["#text"],
                        items.stats.MinSecondsPerGame["#text"]]
                        break;
                    default:
                            break;
                }

                }else{
                    switch(this.title){
                        case "Points":
                        case "Opponent Points":
                        case "Assists":
                        case "Opponent Assists":
                        case "Field Goals":
                        case "Opponent Field Goals":
                        case "Free Throws":
                        case "Opponent Free Throws":
                        case "3-Point Field Goals":
                        case "Opponent 3-Point Field Goals":
                            columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.PtsPerGame["#text"],
                            items.stats.AstPerGame["#text"],items.stats.FgMadePerGame["#text"],items.stats.FgAttPerGame["#text"],items.stats.FgPct["#text"],
                            items.stats.Fg3PtMadePerGame["#text"],items.stats.Fg3PtAttPerGame["#text"],items.stats.Fg3PtPct["#text"],
                            items.stats.FtMadePerGame["#text"],items.stats.FtAttPerGame["#text"],items.stats.FtPct["#text"]]
                            break;
                        case "Fouls":
                            columns =[items.team.Name,items.stats.GamesPlayed["#text"],items.stats.FoulPers["#text"],
                            items.stats.FoulPersPerGame["#text"],items.stats.FoulFlag1["#text"],items.stats.FoulTech["#text"],
                            items.stats.Ejections["#text"]];
                            break;    
                        case "Rebounds":
                             columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.OffReb["#text"],
                             items.stats.DefReb["#text"],items.stats.DefRebPerGame["#text"],items.stats.Reb["#text"],
                            items.stats.RebPerGame["#text"]]
                            break;
                        case "Blocks":
                        case "Steals":
                        case "Turnovers": 
                             columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.Blk["#text"],
                                items.stats.BlkPerGame["#text"],items.stats.Stl["#text"],items.stats.StlPerGame["#text"],
                                items.stats.Tov["#text"],items.stats.TovPerGame["#text"],items.stats.FoulTech["#text"]];
                                break;
                        case "offense":
                             columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,
                            items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],items.stats.Pts["#text"],
                            items.stats.FgMadePerGame["#text"],items.stats.FgAttPerGame["#text"],items.stats.FgPct["#text"],
                            items.stats.Fg3PtMadePerGame["#text"],items.stats.Fg3PtAttPerGame["#text"],items.stats.Fg3PtPct["#text"],
                            items.stats.FtMadePerGame["#text"],items.stats.FtAttPerGame["#text"],items.stats.FtPct["#text"]];
                        break;
                        case "defense":
                            columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,
                            items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],items.stats.OffRebPerGame["#text"],
                            items.stats.DefRebPerGame["#text"],items.stats.RebPerGame["#text"],items.stats.BlkPerGame["#text"],
                            items.stats.StlPerGame["#text"],items.stats.TovPerGame["#text"],items.stats.Ast["#text"],
                            items.stats.AstPerGame["#text"],items.stats.FoulPers["#text"]];
                        case 'miscellanious':
                            var headers =["PLAYER","POS","GP","MPG","PFG","FLAGG","TG","EJE"];
                            columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,
                            items.stats.GamesPlayed["#text"],items.stats.MinSecondsPerGame["#text"],items.stats.FoulsPerGame["#text"],
                            items.stats.FoulFlag1PerGame["#text"],items.stats.FoulTech["#text"],items.stats.Ejections["#text"]];

                        default:
                            break;
                    }
                }
        return columns;        
    }

    getMLBPlayerBattingHeader(){
        var headers =["PLAYER","POS","TEAM","AVG","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","OBP","SLG","OPS"];
        return headers;
    }
    getMLBPlayerPitchingHeader(){
        var headers =["PLAYER","POS","TEAM","GP","IP","W","L","SV","SVO","H","R","HR","ER","ERA","BB","PTP","WHIP"];
        return headers;
    }
    getMLBPlayerFieldingHeader(){
        var headers =["PLAYER","POS","TEAM","GP","TC","E","FPO","A","FDP","PK"];
        return headers;
    }

    getMLBTeamBattingHeader(){
        var headers =["TEAM","GP","AB","R","H","2B","3B","HR","RBI","AVG","TB","LOB","SLG","OPS"];
        return headers;
    }
    getMLBTeamPitchingHeader(){
        var headers =["TEAM","GP","W","L","ERA","SHO","SO","IP","ER","BB","WHIP"];
        return headers;
    }

    getMLBTeamFieldingHeader(){
        var headers =["TEAM","GP","TC","E","FPO","A","FDP","FPCT","PK"];
        return headers;
    }

    getMLBRowContent(items){
        var columns =[];
        if(this.statFor==='player'){
                switch(this.title){
                    case "Batting Average":
                    case "Batting":
                    case "Home Runs":
                    case "Runs Batted In":
                    case "Hits":
                    case "On-Base Percentage":
                        columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,items.stats.BattingAvg["#text"],
                        items.stats.AtBats["#text"],items.stats.Runs["#text"],items.stats.Hits["#text"],items.stats.SecondBaseHits["#text"],
                        items.stats.ThirdBaseHits["#text"],items.stats.Homeruns["#text"],items.stats.RunsBattedIn["#text"],items.stats.StolenBases["#text"],
                        items.stats.CaughtBaseSteals["#text"],items.stats.BatterWalks["#text"],items.stats.BatterOnBasePct["#text"],
                        items.stats.BatterSluggingPct["#text"],items.stats.BatterOnBasePlusSluggingPct["#text"]];
                        break;
                    case "Pitching":    
                    case "ERA":
                    case "Wins":
                    case "Saves":
                    case "Strikeouts":
                    case "WHIP":
                        columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,items.stats.GamesPlayed["#text"],
                        items.stats.InningsPitched["#text"],items.stats.Wins["#text"],items.stats.Losses["#text"],items.stats.Saves["#text"],
                        items.stats.SaveOpportunities["#text"],items.stats.HitsAllowed["#text"],items.stats.RunsAllowed["#text"],
                        items.stats.HomerunsAllowed["#text"],items.stats.EarnedRunsAllowed["#text"],items.stats.EarnedRunAvg["#text"],
                        items.stats.PitcherWalks["#text"],items.stats.PitcherTriplePlays["#text"],items.stats.WalksAndHitsPerInningPitched["#text"]];
                        break;
                    case "Fielding":     
                    case "Fielding Percentage":
                    case "Double Plays":
                    case "Errors":
                    case "Total Chances":
                    case "Outfield Assists":
                        columns =[items.player.FirstName+" "+items.player.LastName,items.player.Position,items.team.Name,items.stats.GamesPlayed["#text"],
                        items.stats.TotalChances["#text"],items.stats.Errors["#text"],items.stats.FielderPutOuts["#text"],
                        items.stats.Assists["#text"],items.stats.FielderDoublePlays["#text"],items.stats.Pickoffs["#text"]];
                        break;
                    default:
                        break; 
                }
        }else{
            switch(this.title){
                    case "Runs Scored":
                    case "Batting":
                    case "Home Runs":
                    case "Runs Batted In":
                    case "Hits":
                    case "On-Base Percentage":
                            columns =[items.team.Name,items.stats.GamesPlayed["#text"],items.stats.AtBats["#text"],
                            items.stats.Runs["#text"],items.stats.Hits["#text"],items.stats.SecondBaseHits["#text"],
                            items.stats.ThirdBaseHits["#text"],items.stats.Homeruns["#text"],items.stats.RunsBattedIn["#text"],
                            items.stats.BattingAvg["#text"],items.stats.TotalBases["#text"],items.stats.LeftOnBase["#text"],
                            items.stats.BatterSluggingPct["#text"],items.stats.BatterOnBasePlusSluggingPct["#text"]];
                            break;
                    case "Pitching":         
                    case "ERA":
                    case "Wins":
                    case "Saves":
                    case "Strikeouts":
                    case "WHIP":
                            columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.Wins["#text"],
                            items.stats.Losses["#text"],items.stats.EarnedRunAvg["#text"],items.stats.Shutouts["#text"],
                            items.stats.PitcherStrikeouts["#text"],items.stats.InningsPitched["#text"],items.stats.EarnedRunsAllowed["#text"],items.stats.PitcherWalks["#text"],
                            items.stats.WalksAndHitsPerInningPitched["#text"]];
                            break;
                    case "Fielding":        
                    case "Fielding Percentage":
                    case "Double Plays":
                    case "Errors":
                    case "Total Chances":
                    case "Outfield Assists":
                            columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.TotalChances["#text"],
                            items.stats.Errors["#text"],items.stats.FielderPutOuts["#text"],items.stats.Assists["#text"],
                            items.stats.FielderDoublePlays["#text"],items.stats.FieldingPct["#text"],items.stats.Pickoffs["#text"]]
                            break;
                    default:
                        break;        
            }
        }
        return columns;
    }


    getNFLPlayerPassingHeader(){
        var headers =["PLAYER","POS","TEAM","G","ATT","COMP","PCT","YDS","YDS/A","LNG","TD","INT","SACK","QBRATE"];
        return headers;
    }
    getNFLPlayerRushingHeader(){
        var headers =["PLAYER","POS","TEAM","G","ATT","YDS","AVG","TD","LNG","20+"];
        return headers;
    }
    getNFLPlayerReceivingHeader(){
        var headers =["PLAYER","POS","TEAM","G","REC","YDS","AVG","TD","LNG","20+","40+"];
        return headers;
    }
    getNFLPlayerTouchdownsAndScoringHeader(){
        var headers =["PLAYER","POS","TEAM","G","RUSH","RECTD","PR","KR","INT","FUM","XP","FG","2PT"];
        return headers;
    }
    getNFLPlayerDefenceHeader(){
        var headers =["PLAYER","POS","TEAM","AST","TOTAL","SACK","SACKYDS","PD","INT","INTYDS","INTLONG","INTTD","FF","FREC","FTD"];
        return headers;
    }
    getNFLPlayerFGAndXPHeader(){
        var headers =["PLAYER","POS","TEAM","FGM","FGA","FGPCT","FGLONG","FG1_19","FG20_29","FG30_39","FG40_49","FG50+","XPM","XPA","XPCT"];
        return headers;
    }
    getNFLPlayersPuntingHeaders(){
        var headers =["PLAYER","POS","TEAM","PUNTS","YDS","LNG","AVG","NET","BP","IN20","TB","FC","RET","RETAVG","RETY"];
        return headers;
    }
    getNFLPlayersKickbackAndPuntReturnHeaders(){
        var headers =["PLAYER","POS","TEAM","KRET","KYDS","KAVG","KTD","K40+","KFC","PR","PYDS","PLNG","PTD","P20+","PRFC"];
        return headers;
    }

    getNFLTeamPassingHeader(){
        var headers= ["TEAM","ATT","COMP","PCT","YDS","YDS/A","NETYDS","LONG","TD","INT","SACK","SACKY","QBRRate"];
        return headers;
    }

    getNFLTeamRushingAndReceivingHeaders(){
        var headers =["TEAM","ATT","YDS","AVG","LONG","TD","FUM","20+"];
        return headers;
    }

    getNFLTeamScoringOffenseHeaders(){
        var headers =["TEAM","G","PF","PASSTD","RUSHTD","RECTD","INTTD","FUMTD","KRTD","PRTD","XP","FG","SFTY","2PT"];
        return headers;
    }

    getNFLTeamOffenceHeaders(){
         var headers =["TEAM","ATT","YDS","NETPASS","RUSH","RUSHAVG"];
          return headers;
    }
    getNFLTeamSACKInterceptionAndFumblesHeaders(){
        var headers =["TEAM","SOLOTACK","ASTTACK","TOTALTACK","SACK","SACKYDS","PD","PINT","PYDS","PLNG","PTD","FF","FREC","FTD"];
        return headers;
    }
    getNFLTeamFGAndKickoffHeaders(){
        var headers =["TEAM","FGM","FGA","FPCT","FLNG","FM50","FA50","FG50PCT","XPBLK","XPM","XPA","XPCT"];
        return headers;
    }

    getNFLTeamKickoffAndPuntReturnHeaders(){
         var headers =["TEAM","KRET","KYDS","KAVG","KLNG","KTD","20+","KFC","KFUM","PRET","PYDS","PAVG","PLNG","PTD","20+","PFC","PFUM"];
         return headers;
    }
    getNFLTeamPuntingHeaders(){
        var headers=["TEAM","PUNTS","YDS","LNG","AVG","NET","IN20","TB","FC","RET","RETY","RETAVG"];
        return headers;
    }

    getNFLRowContent(items){
        var columns =[];
        if(this.statFor==='player'){
                switch(this.title){
                    case "Passing":
                        columns = [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],(items.stats.PassAttempts)?items.stats.PassAttempts["#text"]:0,
                        (items.stats.PassCompletions)?items.stats.PassCompletions["#text"]:0,(items.stats.PassPct)?items.stats.PassPct["#text"]:0,
                        (items.stats.PassYards)?items.stats.PassYards["#text"]:0,(items.stats.PassYardsPerAtt)?items.stats.PassYardsPerAtt["#text"]:0,
                        (items.stats.PassLng)?items.stats.PassLng["#text"]:0,(items.stats.PassTD)?items.stats.PassTD["#text"]:0,
                        (items.stats.PassInt)?items.stats.PassInt["#text"]:0,(items.stats.PassSacks)?items.stats.PassSacks["#text"]:0,
                        (items.stats.QBRating)?items.stats.QBRating["#text"]:0];
                        break;
                    case "Rushing":  
                        columns =[items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],items.stats.RushAttempts["#text"],items.stats.RushYards["#text"],
                        items.stats.RushAverage["#text"],items.stats.RushTD["#text"],items.stats.RushLng["#text"],
                        items.stats.Rush20Plus["#text"]];
                        break;
                    case "Receiving":
                        columns = [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],(items.stats.Receptions)?items.stats.Receptions["#text"]:0,
                        (items.stats.RecYards)?items.stats.RecYards["#text"]:0,(items.stats.RecAverage)?items.stats.RecAverage["#text"]:0,
                        (items.stats.RecAverage)?items.stats.RecTD["#text"]:0,(items.stats.RecLng)?items.stats.RecLng["#text"]:0,
                        (items.stats.Rec20Plus)?items.stats.Rec20Plus["#text"]:0,(items.stats.Rec40Plus)?items.stats.Rec40Plus["#text"]:0];
                        break;
                    case "Touchdowns":
                    case "Scoring": 
                        columns= [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.GamesPlayed["#text"],(items.stats.RushTD)?items.stats.RushTD["#text"]:0,(items.stats.RecTD)?items.stats.RecTD["#text"]:0,
                        (items.stats.PrTD)?items.stats.PrTD["#text"]:0,(items.stats.KrTD)?items.stats.KrTD["#text"]:0,(items.stats.IntTD)?items.stats.IntTD["#text"]:0,
                        (items.stats.FumTD)?items.stats.FumTD["#text"]:0,(items.stats.XpMade)?items.stats.XpMade["#text"]:0,(items.stats.FgBlk)?items.stats.FgBlk["#text"]:0,
                        (items.stats.TwoPtAtt)?items.stats.TwoPtAtt["#text"]:0] 
                        break;
                    case "Tackles":
                    case "Sacks":
                    case "Interceptions":
                    case "Fumbles Forced":
                        columns = [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        items.stats.TackleAst["#text"],items.stats.TackleTotal["#text"],items.stats.Sacks["#text"],
                        items.stats.SackYds["#text"],items.stats.PassesDefended["#text"], (items.stats.PassInt)?items.stats.PassInt["#text"]:0,
                        items.stats.IntYds["#text"],items.stats.IntLng["#text"],items.stats.IntTD["#text"],items.stats.FumForced["#text"],items.stats.FumOwnRec["#text"],
                        items.stats.FumTD["#text"]];
                        break;
                    case "Field Goals":
                    case "Extra Points":
                        columns = [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        (items.stats.FgMade)?items.stats.FgMade["#text"]:0,(items.stats.FgAtt)?items.stats.FgAtt["#text"]:0,(items.stats.FgPct)?items.stats.FgPct["#text"]:0,
                        (items.stats.FgLng)?items.stats.FgLng["#text"]:0,(items.stats.FgMade1_19)?items.stats.FgMade1_19["#text"]:0,(items.stats.FgMade20_29)?items.stats.FgMade20_29["#text"]:0,
                        (items.stats.FgMade30_39)?items.stats.FgMade30_39["#text"]:0, (items.stats.FgMade40_49)?items.stats.FgMade40_49["#text"]:0,
                        (items.stats.FgMade50Plus)?items.stats.FgMade50Plus["#text"]:0, (items.stats.XpMade)?items.stats.XpMade["#text"]:0,
                        (items.stats.XpAtt)?items.stats.XpAtt["#text"]:0,(items.stats.XpPct)?items.stats.XpPct["#text"]:0];
                        break;
                    case "Punting":
                        columns = [items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        (items.stats.Punts)?items.stats.Punts["#text"]:0, (items.stats.PuntYds)?items.stats.PuntYds["#text"]:0,(items.stats.PuntLng)?items.stats.PuntLng["#text"]:0,
                        (items.stats.PuntAvg)?items.stats.PuntAvg["#text"]:0,(items.stats.PuntNetYds)?items.stats.PuntNetYds["#text"]:0,(items.stats.PuntBlk)?items.stats.PuntBlk["#text"]:0,
                        (items.stats.PuntIn20)?items.stats.PuntIn20["#text"]:0,(items.stats.PuntTB)?items.stats.PuntTB["#text"]:0,(items.stats.PuntFC)?items.stats.PuntFC["#text"]:0,
                        (items.stats.PuntRet)?items.stats.PuntRet["#text"]:0,(items.stats.PuntRetAvg)?items.stats.PuntRetAvg["#text"]:0,(items.stats.PuntRetYds)?items.stats.PuntRetYds["#text"]:0];
                        break;
                    case "Kickoff Returns":
                    case "Punt Returns":
                        columns =[items.player.FirstName+" "+ items.player.LastName,items.player.Position,items.team.Name,
                        (items.stats.KrRet)?items.stats.KrRet["#text"]:0,(items.stats.KrYds)?items.stats.KrYds["#text"]:0, 
                        (items.stats.KrAvg)?items.stats.KrAvg["#text"]:0, (items.stats.KrTD)?items.stats.KrTD["#text"]:0,
                        (items.stats.Kr40Plus)?items.stats.Kr40Plus["#text"]:0,(items.stats.KrFC)?items.stats.KrFC["#text"]:0,
                        (items.stats.PrRet)?items.stats.PrRet["#text"]:0, (items.stats.PrYds)?items.stats.PrYds["#text"]:0,
                        (items.stats.PrLng)?items.stats.PrLng["#text"]:0,  (items.stats.PrTD)?items.stats.PrTD["#text"]:0, 
                        (items.stats.Pr20Plus)?items.stats.Pr20Plus["#text"]:0, (items.stats.PrFC)?items.stats.PrFC["#text"]:0];
                        break;
                    default:
                        break; 
                }
        }else{
            switch(this.title){
                    case "Passing Offense":
                    case "Passing Defence":
                        columns =[items.team.Name,items.stats.PassAttempts["#text"],items.stats.PassCompletions["#text"],items.stats.PassPct["#text"],
                        items.stats.PassGrossYards["#text"],items.stats.PassYardsPerAtt["#text"],items.stats.PassNetYards["#text"],items.stats.PassLng["#text"],items.stats.PassTD["#text"],
                        items.stats.PassInt["#text"],items.stats.PassSacks["#text"],items.stats.PassSackY["#text"],items.stats.QBRating["#text"]];
                        break;
                    case "Rushing Offense":
                    case "Rushing Defense":
                        columns =[items.team.Name,items.stats.RushAttempts["#text"],items.stats.RushYards["#text"],
                        items.stats.RushAverage["#text"],items.stats.RushLng["#text"],items.stats.RushTD["#text"],
                        items.stats.RushFumbles["#text"],items.stats.Rush20Plus["#text"]];
                        break;
                    case "Receiving Defense":
                    case "Receiving Offense":  
                        columns =[items.team.Name,items.stats.Receptions["#text"],items.stats.RecYards["#text"],
                        items.stats.RecAverage["#text"],items.stats.RecLng["#text"],items.stats.RecTD["#text"],
                        items.stats.RecFumbles["#text"],items.stats.Rec20Plus["#text"]];
                        break;
                    case "Scoring Offense":
                    case "Scoring Defense":
                        columns =[items.team.Name,items.team.GamesPlayed["#text"],items.team.PointsFor["#text"],items.team.PassTD["#text"],
                        items.team.RushTD["#text"],items.team.RecTD["#text"],items.team.IntTD["#text"],items.team.FumTD["#text"],
                        items.team.KrTD["#text"],items.team.PrTD["#text"],items.team.XpMade["#text"],items.team.FgMade["#text"],
                        items.team.Safeties["#text"],items.team.TwoPtMade["#text"]];
                        break;
                    case "Total Offense":
                    case "Total Defense":
                        columns =[items.team.Name,items.stats.PassAttempts["#text"],items.stats.PassGrossYards["#text"],
                        items.stats.PassNetYards["#text"],items.stats.RushAttempts["#text"],items.stats.RushAverage["#text"]]
                        break;
                    case "Sacks / Interceptions":
                    case "Fumbles Forced":
                        columns =[items.team.Name,items.stats.TackleSolo["#text"],items.stats.TackleAst["#text"],items.stats.TackleTotal["#text"],
                        items.stats.Sacks["#text"],items.stats.SackYds["#text"],items.stats.PassesDefended["#text"],items.stats.PassInt["#text"],
                        items.stats.PassGrossYards["#text"],items.stats.PassLng["#text"],items.stats.PassTD["#text"],items.stats.FumForced["#text"],
                        items.stats.FumRecYds["#text"],items.stats.FumTD["#text"]]
                        break; 
                    case "Field Goals":
                    case "Kickoffs":
                        columns = [items.team.Name,items.stats.FgMade["#text"],items.stats.FgAtt["#text"],items.stats.FgPct["#text"],
                        items.stats.FgLng["#text"],items.stats.FgMade50Plus["#text"],items.stats.FgAtt50Plus["#text"],items.stats.Fg50PlusPct["#text"],
                        items.stats.XpBlk["#text"],items.stats.XpMade["#text"],items.stats.XpAtt["#text"],items.stats.XpPct["#text"]];
                        break;
                    case "Punting":
                        columns =[items.team.Name,items.stats.Punts["#text"],items.stats.PuntYds["#text"],items.stats.PuntLng["#text"],
                        items.stats.PuntAvg["#text"],items.stats.PuntNetYds["#text"],items.stats.PuntIn20["#text"],items.stats.PuntTB["#text"],
                        items.stats.PuntFC["#text"],items.stats.PuntRet["#text"],items.stats.PuntRetYds["#text"],items.stats.PuntRetAvg["#text"]];
                        break;
                    case "Punt Returns":
                    case "Kick Returns":
                        columns=[items.team.Name,items.stats.KrRet["#text"],items.stats.KrYds["#text"],items.stats.KrAvg["#text"],
                        items.stats.KrLng["#text"],items.stats.KrTD["#text"],items.stats.Kr20Plus["#text"],items.stats.KrFC["#text"],
                        items.stats.KrFum["#text"],items.stats.PuntRet["#text"],items.stats.PuntRetYds["#text"],items.stats.PuntRetAvg["#text"],
                        items.stats.PrLng["#text"],items.stats.PrTD["#text"],items.stats.Pr20Plus["#text"],items.stats.PrFC["#text"],
                        items.stats.PrFum["#text"]];
                        break;
                    default:
                        break;  
            }
        }
        return columns;        
    }

    getNHLPlayerScoringHeaders(){
        var headers =["PLAYER","TEAM","POS","GP","G","A","PTS","+/-","PIM","SHOTS","SHOTPCT","GWG","GTG","PPG","PPA","SHG","SHA"];
        return headers;
    }

    getNHLPlayerGoalTendingHeaders(){
        var headers =["PLAYER","TEAM","POS","GP","W","L","OTL","GAA","GA","SA","SV","SVPCT","SO"];
        return headers;
    }

    getNHLPlayerPenaltyHeaders(){
        var headers =["PLAYER","TEAM","POS","PIM"];
        return headers;
    }

    getNHLTeamScoringHeaders(){
        var headers =["TEAM","GP","PTS","GF","GA","PPG","PP%","SHGF","SH","PIM"];
        return headers;
    }

    getNHLTeamSpecialTeamHeaders(){
        var headers =["TEAM","GP","PP","PPG","PP%","GA","SHGA"];
        return headers;
    }
    getNHLTeamPenaltiesHeaders(){
        var headers= ["TEAM","GP","PN","PIM","PK","PKGA","PK%"];
        return headers;
    }

     getNHLRowContent(items){
        var columns =[];

            if(this.statFor==='player'){
                switch(this.title){
                    case "Goals":
                    case "Assists":
                    case "Points":
                    case "Goals Breakdown":
                        columns =[items.player.FirstName+" "+items.player.LastName,items.team.Name,items.player.Position,
                        items.stats.GamesPlayed["#text"],items.stats.stats.Goals["#text"],items.stats.stats.Assists["#text"],items.stats.stats.Points["#text"],
                        items.stats.stats.PlusMinus["#text"],items.stats.stats.PenaltyMinutes["#text"],items.stats.stats.Shots["#text"],items.stats.stats.ShotPercentage["#text"],
                        items.stats.stats.GameWinningGoals["#text"],items.stats.stats.GameTyingGoals["#text"],items.stats.stats.PowerplayGoals["#text"],items.stats.stats.PowerplayAssists["#text"],
                        items.stats.stats.ShorthandedGoals["#text"],items.stats.stats.ShorthandedAssists["#text"]];
                        break;
                    case "Wins":
                    case "Goals Against Avg.":
                    case "Save Percentage":
                        columns =[items.player.FirstName+" "+items.player.LastName,items.team.Name,items.player.Position,
                        items.stats.GamesPlayed["#text"],(items.stats.stats.Wins)?items.stats.stats.Wins["#text"]:0,
                        (items.stats.stats.Losses)?items.stats.stats.Losses["#text"]:0,(items.stats.stats.OvertimeLosses)?items.stats.stats.OvertimeLosses["#text"]:0,
                        (items.stats.stats.GoalsAgainstAverage)?items.stats.stats.GoalsAgainstAverage["#text"]:0,
                        (items.stats.stats.GoalsAgainst)?items.stats.stats.GoalsAgainst["#text"]:0,
                        (items.stats.stats.ShotsAgainst)?items.stats.stats.ShotsAgainst["#text"]:0,(items.stats.stats.Saves)?items.stats.stats.Saves["#text"]:0,
                        (items.stats.stats.SavePercentage)?items.stats.stats.SavePercentage["#text"]:0,(items.stats.stats.Shutouts)?items.stats.stats.Shutouts["#text"]:0];
                        break; 
                    case "Penalty Minutes":
                    case "Penalty Minutes/Game":
                        columns = [items.player.FirstName+" "+items.player.LastName,items.team.Name,items.player.Position,
                        items.stats.stats.PenaltyMinutes["#text"]];
                        break;
                    default:
                        break;    
                }
            }else{
                switch(this.title){
                    case "Points":
                    case "Goals Breakdown - Offensive":
                    case "Shots":
                        columns  =[items.team.Name,items.stats.GamesPlayed["#text"],items.stats.Points["#text"],
                        items.stats.GoalsFor["#text"],items.stats.GoalsAgainst["#text"],items.stats.PowerplayGoals["#text"],
                        items.stats.PowerplayPercent["#text"],items.stats.ShorthandedGoalsFor["#text"],items.stats.Shots["#text"],
                        items.stats.PenaltyMinutes["#text"]];
                        break;
                    case "Power Play Goals":
                    case "Goals Against":
                        columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.Powerplays["#text"],
                        items.stats.PowerplayGoals["#text"],items.stats.PowerplayPercent["#text"],items.stats.GoalsAgainst["#text"],
                        items.stats.ShorthandedGoalsAgainst["#text"]];
                        break; 
                    case "Penalty Minutes":
                    case "Penalty Minutes/Game":
                    case "Penalty Kill Percentage":
                        columns = [items.team.Name,items.stats.GamesPlayed["#text"],items.stats.Penalties["#text"],
                        items.stats.PenaltyMinutes["#text"],items.stats.PenaltyKills["#text"],items.stats.PenaltyKillGoalsAllowed["#text"],
                        items.stats.PenaltyKillPercent["#text"]];
                        break;
                }
            }
            return columns;
     }    

    handleRowContent(items){
        var columns =[];
        switch(this.game){
            case 'nba':
                columns = this.getNBARowContent(items);
                break;
            case 'mlb':
                columns = this.getMLBRowContent(items);
                break;
            case 'nfl':
                columns = this.getNFLRowContent(items);
                break;
            case 'nhl':
                columns = this.getNHLRowContent(items);
                break;
            default:
                break;           
        }
       return columns; 
    }

    getNBAHeaders(){
        var headers =[];
        if(this.statFor==='team'){
                switch(this.title){
                    case "Points":
                    case "Opponent Points":
                    case "Assists":
                    case "Opponent Assists":
                    case "Field Goals":
                    case "Opponent Field Goals":
                    case "Free Throws":
                    case "Opponent Free Throws":
                    case "3-Point Field Goals":
                    case "Opponent 3-Point Field Goals":
                        headers= this.getNBATeamOffenseHeader();
                        break;
                    case "offense":
                        headers = this.getNBAPerTeamOffenseHeader();
                        break;
                    case "defense":
                        headers = this.getNBATeamDefenseHeader();
                        break; 
                    case "miscellanious":
                        headers = this.getNBATeamMiscHeader();
                        break;            
                    case "Fouls":
                        headers = this.getNBATeamFoulsHeader();
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
    
    getMLBHeaders(){
        var headers =[];
        if(this.statFor==='player'){
                switch(this.title){
                    case "Batting Average":
                    case "Batting":
                    case "Home Runs":
                    case "Runs Batted In":
                    case "Hits":
                    case "On-Base Percentage":
                        headers  = this.getMLBPlayerBattingHeader();
                        break;
                    case "ERA":
                    case "Wins":
                    case "Saves":
                    case "Pitching":
                    case "Strikeouts":
                    case "WHIP":
                        headers = this.getMLBPlayerPitchingHeader();
                        break;
                    case "Fielding Percentage":
                    case "Fielding":
                    case "Double Plays":
                    case "Errors":
                    case "Total Chances":
                    case "Outfield Assists":
                        headers = this.getMLBPlayerFieldingHeader();
                        break;
                    default:
                        break;            
                }
        }else{
            switch(this.title){
                    case "Runs Scored":
                    case "Home Runs":
                    case "Runs Batted In":
                    case "Hits":
                    case "On-Base Percentage":
                        headers  = this.getMLBTeamBattingHeader();
                        break;
                    case "ERA":
                    case "Wins":
                    case "Saves":
                    case "Strikeouts":
                    case "WHIP":
                        headers = this.getMLBTeamPitchingHeader();
                        break;
                    case "Fielding Percentage":
                    case "Double Plays":
                    case "Errors":
                    case "Total Chances":
                    case "Outfield Assists":
                        headers = this.getMLBTeamFieldingHeader();
                        break;
                    default:
                        break;            
                }
        }
            return headers;
    }

    getNFLHeaders(){
        var headers =[];
        if(this.statFor==='player'){
            switch(this.title){
                case "Passing":
                    headers = this.getNFLPlayerPassingHeader();
                    break;
                case "Rushing":
                    headers = this.getNFLPlayerRushingHeader();
                    break;
                case "Receiving":
                    headers = this.getNFLPlayerReceivingHeader();
                    break;
                case "Touchdowns":
                case "Scoring":
                    headers = this.getNFLPlayerTouchdownsAndScoringHeader();
                    break;
                case "Tackles":
                case "Sacks":
                case "Interceptions":
                case "Fumbles Forced":
                    headers = this.getNFLPlayerDefenceHeader();
                    break;
                case "Field Goals":
                case "Extra Points":
                    headers = this.getNFLPlayerFGAndXPHeader();
                    break;
                case "Punting":
                    headers = this.getNFLPlayersPuntingHeaders();
                    break;
                case "Kickoff Returns":
                case "Punt Returns":
                    headers =this.getNFLPlayersKickbackAndPuntReturnHeaders();        

            }
        }else{
            switch(this.title){
                case "Passing Offense":
                case "Passing Defence":
                    headers = this.getNFLTeamPassingHeader();
                    break;
                case "Rushing Offense":
                case "Receiving Offense":
                case "Rushing Defense":
                case "Receiving Defense":
                    headers = this.getNFLTeamRushingAndReceivingHeaders();   
                    break;
                case "Scoring Offense":
                case "Scoring Defense":
                    headers = this.getNFLTeamScoringOffenseHeaders();
                    break;
                case "Total Offense":
                case "Total Defense":
                    headers = this.getNFLTeamOffenceHeaders();
                    break;
                case "Sacks / Interceptions":
                case "Fumbles Forced":
                    headers = this.getNFLTeamSACKInterceptionAndFumblesHeaders();
                    break; 
                case "Field Goals":
                case "Kickoffs":
                    headers = this.getNFLTeamFGAndKickoffHeaders();
                    break;
                case "Punting":
                    headers = this.getNFLTeamPuntingHeaders();
                    break;
                case "Punt Returns":
                case "Kick Returns":
                    headers = this.getNFLTeamKickoffAndPuntReturnHeaders();
                    break;
                default:
                    break;  
            }
        }
        return headers;
    }

    getNHLHeaders(){
        var headers =[];
        if(this.statFor==='player'){
            switch(this.title){
                case "Goals":
                case "Assists":
                case "Points":
                case "Goals Breakdown":
                    headers= this.getNHLPlayerScoringHeaders();
                    break;
                case "Wins":
                case "Goals Against Avg.":
                case "Save Percentage":
                    headers =this.getNHLPlayerGoalTendingHeaders();
                    break;
                case "Penalty Minutes":
                case "Penalty Minutes/Game":
                    headers = this.getNHLPlayerPenaltyHeaders();  
                    break;
                default:
                    break;    
            }
        }else{
            switch(this.title){
                case "Points":
                case "Goals Breakdown - Offensive":
                case "Shots":
                    headers = this.getNHLTeamScoringHeaders();
                    break;
                case "Power Play Goals":
                case "Goals Against":
                    headers = this.getNHLTeamSpecialTeamHeaders();
                    break;
                case "Penalty Minutes":
                case "Penalty Minutes/Game":
                case "Penalty Kill Percentage":
                    headers = this.getNHLTeamPenaltiesHeaders();
                    break;
                default:
                    break;    
            }
        }
        return headers;
    }

    getID(item){
        if(this.statFor==='team'){
            return item.team.ID;
        }else{
            return item.player.ID;
        }
    }

    getseasonOptions(){
      var startYear = 2017;
      var endYear = 2018;
      var options =[];
      var season = ["2016-2017-regular","2017-playoff","2015-2016-regular","2016-playoff"];
      var seasonName = ["2016 Regular",'2017 Playoff','2015 Regular'];
      if(this.game==='mlb'){
          season = ["2017-regular","2017-playoff","2016-2017-regular","2016-playoff"];
          seasonName = ["2017 Regular",'2017 Playoff','2016 Regular'];
      }
      for(var i=0;i<season.length;i++){
        var optionVal = startYear+"-"+endYear+'-regular';
        options.push(<option value ={season[i]}>{seasonName[i]} Season</option>)
        startYear--;
        endYear--;
      }
      return options;
    }


    getTableHeaderCount(){
        var currPath = window.location.href;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        this.statFor = subcontent.substring(0,subcontent.indexOf(this.title)-1);
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
              this.tableHeaders = this.getNFLHeaders();
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
              this.tableHeaders = this.getNHLHeaders();
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
               this.tableHeaders=this.getMLBHeaders();
        }else{
               this.game='nba';
               this.tableHeaders= this.getNBAHeaders();
        }
        return this.tableHeaders.length;
    }
    getNBAPlayerSortAbbreviation(name){
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

  getNBATeamSortAbbreviations(name){
      if(name==='Points') return 'stats.PTS/G.D';
      else if(name==='Opponent Points') return 'stats.PTSA/G';
      else if(name==='Rebounds') return 'stats.DREB/G.D';
      else if(name==='Assists') return 'stats.AST/G.D';
      else if(name==='Opponent Assists') return 'stats.AST/G.D';
      else if(name==='Blocks') return 'stats.BS/G.D';
      else if(name==='Field Goals') return 'stats.FG%.D';
      else if(name==='Opponent Field Goals') return 'stats.FG%.D';
      else if(name==='Steals') return 'stats.STL/G.D';
      else if(name==='Free Throws') return 'stats.FT%.D';
      else if(name==='Opponent Free Throws') return 'stats.FT%.D';
      else if(name==='Turnovers') return 'stats.TOV/G.D';
      else if(name==='3-Point Field Goals') return 'stats.3P%.D';
      else if(name==='Opponent 3-Point Field Goals') return 'stats.3P%.D';
      else if(name==='Fouls') return 'stats.F/G.D';
  }

  getMLBSortAbbreviation(name){
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

  getNHLPlayerSortAbbreviation(name){
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

  getNHLTeamSortAbbreviations(name){
      if(name==='Points') return 'stats.Pts.D';
      else if(name==='Power Play Goals') return 'stats.PPG.D';
      else if(name==='Penalty Minutes') return 'stats.PIM.D';
      else if(name==='Goals Breakdown - Offensive') return 'stats.GF.D';
      else if(name==='Goals Against') return 'stats.GA.D';
      else if(name==='Penalty Minutes/Game') return 'stats.PIM.D';
      else if(name==='Penalty Kill Percentage') return 'stats.PK%.D';//Shots
      else if(name==='Shots') return 'stats.Sh.D';
  }

  getNFLPlayerSortAbbreviation(name){
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

  getNFLTeamSortAbbreviations(name){
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

    handleSeasonChange(){
            var currPath = window.location.href;
            var season = document.getElementById("seasonSelector").value;
            var orderBy ='';
            if(this.statFor==='player'){
                if(currPath.indexOf('nfl')!=-1){
                    orderBy = this.getNFLPlayerSortAbbreviation(this.title);
                    this.props.getStats('nfl',season);
                }else if(currPath.indexOf('nhl')!=-1){
                    orderBy = this.getNHLPlayerSortAbbreviation(this.title);
                    this.props.getStats(orderBy,'nhl',season);
                }else if(currPath.indexOf('mlb')!=-1){
                     orderBy = this.getMLBSortAbbreviation(this.title);
                    this.props.getStats(orderBy,'mlb',season);
                }else{
                     orderBy = this.getNBATeamSortAbbreviations(this.title);

                    this.props.getStats(orderBy,'nba',season);
                }
            }else{
                if(currPath.indexOf('nfl')!=-1){
                    orderBy = this.getNFLTeamSortAbbreviations(this.title);
                     this.props.getTeamStats('nfl',season);
                }else if(currPath.indexOf('nhl')!=-1){
                    orderBy = this.getNHLTeamSortAbbreviations(this.title);
                     this.props.getTeamStats(orderBy,'nhl',season);
                }else if(currPath.indexOf('mlb')!=-1){
                     orderBy = this.getMLBSortAbbreviation(this.title);
                     this.props.getTeamStats(orderBy,'mlb',season);
                }else{
                        orderBy = this.getNBATeamSortAbbreviations(this.title);
                        this.props.getTeamStats(orderBy,'nba',season);
                }
            }
    }

    render() {
        return <Loader loaded={this.state.loaded}>
        <div className = 'statsPanel'>

                <div className="seasonPanel">
                        <select id ="seasonSelector" className="season-dropdown-menu" onChange={() => this.handleSeasonChange()}>{this.getseasonOptions()}</select>
                </div>
                <div className="statsContent">
                    <table className="optionData">
                        <tbody>
                            <tr className="statsTableLabel">
                                    {this.getTitle()}
                            </tr>
                            <tr className="ss-row tableLabel">
                                {this.getTableHeaders().map((header,index) => (
                                       <th key={index+10000}>{header}</th> 
                                ))
                                }
                            </tr>
                             {this.state.pageOfItems.map((item,index) =>
                                <tr key={this.getID(item)} className={"ss-row "+ (index%2==0 ?'even':'odd')}>
                                    {this.handleRowContent(item).map((subItem,index) =>(
                                        <td key={index}>{subItem}</td>
                                    ))}
                                </tr>
                            )}

                        </tbody>
                    </table>
                    <Pagination items={this.state.response} onChangePage={this.onChangePage} />
                </div>
            </div>
             </Loader>

    }
}

StatsPanel.propTypes = {
  getSchedule : PropTypes.func.isRequired,
  getStats: PropTypes.func.isRequired,
};


export default connect(null,actionCreators,null,{
  pure: false
})(StatsPanel);