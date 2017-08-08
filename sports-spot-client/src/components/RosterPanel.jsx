import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import Pagination from './Pagination';
var Loader = require('react-loader');

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});
// var socket = io.connect('http://localhost:8090');

export default class RosterPanel extends PureComponent{

    constructor(props){
        super(props);
        this.state={
            response:[],
            pageOfItems: []
        }
        this.game='';
        this.onChangePage = this.onChangePage.bind(this);
    }
    getInitialState(){
        return {
        response: {},
        loaded:false
        }
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    componentDidMount()
    {
        socket.once("curr_news",(data)=>{
            console.log("data here:",data);
                 this.setState({response:data,loaded:true});
         });
    }

    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
    }

    getRosterPlayerTableHeader(){
        var columns=[];
        columns.push(<td key="Number">NO</td>);
        columns.push(<td key="Name">NAME</td>);
        columns.push(<td key="Pos">POS</td>);
        columns.push(<td key="AGE">AGE</td>);
        columns.push(<td key="Height">HT</td>);
        columns.push(<td key="Weight">WT</td>);
        columns.push(<td key="DOB">DOB</td>);
        return columns;
    }

    getRowDetails(player){
        var colummnContent =[];
        colummnContent.push(<td key={player.player.JerseyNumber}>{player.player.JerseyNumber}</td>);
        colummnContent.push(<td key={player.player.FirstName}>{player.player.FirstName} &nbsp;{player.player.LastName}</td>);
        colummnContent.push(<td key={player.player.Position}>{player.player.Position}</td>);
        colummnContent.push(<td key={player.player.Age}>{player.player.Age}</td>);
        colummnContent.push(<td key={player.player.Height}>{player.player.Height}</td>);
        colummnContent.push(<td key={player.player.Weight}>{player.player.Weight}</td>);
        colummnContent.push(<td key={player.player.BirthDate}>{player.player.BirthDate}</td>);
        return colummnContent;

    }
    getRosterPlayerHeader(){
        var currPath = window.location.href;
         var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
         return 'Roster Stats for '+ subcontent.replace("_"," ");
    }


    render() {
        return <Loader loaded={this.state.loaded}>
            <div className = 'rosterPanel'>
                <div className ='rosterInnerWrapper'>
                    <h4 className='main-section-title'>{this.getRosterPlayerHeader()}</h4>
                    <table className="contentTable">
                        <tbody>
                            <tr className="ss-row tableLabel">{this.getRosterPlayerTableHeader()}</tr>
                            {
                                this.state.response.map((player,index) =>(
                                        <tr key={index} className={"ss-row "+ (index%2==0 ?'even':'odd')}>
                                            {this.getRowDetails(player)}
                                        </tr>
                                ))
                            }
                        </tbody> 
                    </table>
                </div>     
            </div>  
            </Loader>
    }
}