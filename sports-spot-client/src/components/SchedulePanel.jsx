/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import { FormGroup,ControlLabel,HelpBlock } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
var DatePicker = require("react-bootstrap-date-picker");
var Loader = require('react-loader');

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});
// var socket = io.connect('http://localhost:8090');

class SchedulePanel extends PureComponent{
    
    constructor(props){
        super(props);
        this.state={
            response:[]
        }
        this.game='';
        var d = new Date();
        this.currentDate = d.getFullYear()+"-"+d.getMonth()+ "-"+ d.getDate();
        this.week ="0";
        this.scheduleGroup =[];
        this.handleDateChange = this.handleDateChange.bind(this);
        this.season='';
        this.date='';
        this.hasSeasonChanged =false;
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    getSchedules(){
        return this.props.schedule ||[];
    }
    checkDateEqual(date){
        if(this.currentDate == date){
            return true;
        }else{
            this.currentDate = date;
            return false;
        }
    }
    checkWeekEqual(week){
         if(this.week == week){
            return true;
        }else{
            this.week = week;
            return false;
        }
    }
    getInitialState(){
     var value = this.getDefaultDateValue();
        return {
        response: [],
        loaded:false,
        value: value,
        
        }
    }
    handleDateChange(value, formattedValue) {
        this.date = value;
        var formattedDate = this.getformattedDate(formattedValue);
        this.setState({
        value: value,
        formattedValue: formattedValue
        });

        this.props.getSchedule(this.game,this.season,formattedDate);
    
        
    }
    getformattedDate(value){
        if(value){
             var fistSlashIndex = value.indexOf('/');
            var month = value.substring(0,fistSlashIndex);
            var lastSlashIndex = value.lastIndexOf('/');
            var date = value.substring(fistSlashIndex+1,lastSlashIndex);
            var year = value.substring(lastSlashIndex+1);
            return year+month+date;
        }else{
            return '';
        }
       
    }
    componentDidMount()
    {
        socket.on("curr_news",(data)=>{
                 this.setState({response:data,loaded:true});
                 this.setScheduleGroup();
         })
    }

    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
         this.setState({loaded:false});
    }


   setScheduleGroup(){
       this.scheduleGroup = this.chunk(this.state.response);
   } 
    
    chunk(array){
        if(!array) return [];
        var result = [], 
            i=0,
            start=0,end=0,
            len =array.length;
        do{
            if(this.checkDateEqual(array[i].date) || i==0){
                end++;
            }else{
                result.push(array.slice(start, end));
                start=end;
                end++;
            }
            i++;    
        }while (end< len);
        result.push(array.slice(start, end));
        return result;
    }
    getScheduleHeader(){
         var currPath = window.location.href;
         var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
        }else{
               this.game='nba';
        }
    if(subcontent =='schedules'){
        return this.game +" Schedules"; 
    }else{
            return 'Schedule for '+ subcontent.replace("_"," ");
        }
    }
    getDefaultDateValue(){
        var currPath = window.location.href;
        var lastSlashIndex = currPath.lastIndexOf("/");
        var subcontent = currPath.substring(lastSlashIndex+1);
        if(currPath.indexOf('nfl')!=-1){
              this.game='nfl';
        }else if(currPath.indexOf('nhl')!=-1){
              this.game='nhl';
        }else if(currPath.indexOf('mlb')!=-1){
               this.game='mlb';
        }else{
               this.game='nba';
        }
        if(!this.hasSeasonChanged && this.date!=''){
                return this.date;
        }
            this.hasSeasonChanged = false;
        if(this.game === 'nba'){
            if(this.season === '2017-playoff'){
                this.date= "2017-04-15T12:00:00.000Z";
            }else if(this.season === '2016-2017-regular'){
                this.date= "2016-10-25T12:00:00.000Z";
            }else if(this.season === '2016-playoff'){
                this.date= "2016-04-16T12:00:00.000Z";
            }else if(this.season === '2015-2016-regular'){
                this.date= "2015-10-27T12:00:00.000Z";
            }
            
        }else if(this.game === 'mlb'){
            if(this.season === '2017-2018-regular'){
                this.date= "2017-04-02T12:00:00.000Z";
            }else if(this.season === '2016-playoff'){
                this.date= "2016-10-04T12:00:00.000Z";
            }else if(this.season === '2016-2017-regular'){
                this.date= "2016-04-03T12:00:00.000Z";
            }
        }else if(this.game === 'nhl'){
            if(this.season === '2017-2018-regular'){
                this.date= "2017-10-04T12:00:00.000Z";
            }else if(this.season === '2017-playoff'){
                this.date= "2017-04-12T12:00:00.000Z";
            }else if(this.season === '2016-2017-regular'){
                this.date= "2016-10-12T12:00:00.000Z";
            }else if(this.season === '2016-playoff'){
                this.date= "2016-04-13T12:00:00.000Z";
            }
        }else if(this.game === 'nfl'){
            if(this.season === '2017-2018-regular'){
                this.date= "2017-09-07T12:00:00.000Z";
            }else if(this.season === '2017-playoff'){
                this.date= "2017-01-07T12:00:00.000Z";
            }else if(this.season === '2016-2017-regular'){
                this.date= "2016-09-08T12:00:00.000Z";
            }else if(this.season === '2016-playoff'){
                this.date= "2016-01-09T12:00:00.000Z";
            }
        }
         return this.date;

    }
    handleSeasonChange(functionParam){
            this.season = document.getElementById("seasonSelector").value;
            this.hasSeasonChanged = true;
            this.props.getSchedule(this.game,this.season);
    }

    getseasonOptions(){
      var startYear = 2017;
      var endYear = 2018;
      var options =[];
      var seasonValues = ["2017-2018-regular","2017-playoff","2016-2017-regular","2016-playoff"];
      var seasonName = ["2017 Regular",'2017 Playoff','2016 Regular','2016 Playoff'];
      if(this.game==='mlb'){
          seasonValues = ["2017-2018-regular","2016-playoff","2016-2017-regular"];
          if(this.season ===''){
            this.season = '2017-2018-regular';
          }
          
          seasonName = ["2017 Regular",'2016 Playoff','2016 Regular'];
      }if(this.game==='nba'){
          seasonValues = ["2017-playoff","2016-2017-regular","2016-playoff","2015-2016-regular"];
          if(this.season ===''){
                this.season = '2017-playoff';
          }
          seasonName = ["2017 Playoff",'2016-2017 Regular','2016 Playoff', '2015-2016 Regular'];
      }
      
       if(this.season ===''){
                this.season = '2017-2018-regular';
       }
      for(var i=0;i<seasonValues.length;i++){
        var optionVal = startYear+"-"+endYear+'-regular';
        options.push(<option key ={seasonValues[i]} value ={seasonValues[i]}>{seasonName[i]} Season</option>);
        startYear--;
        endYear--;
      }
      return options;
    }
    render() {


            return <Loader loaded={this.state.loaded}> 
                <div className = 'schedulePanel'>
                <h3 className ="scheduleTitle">{this.getScheduleHeader()}</h3>
                <div className="seasonController">
                    <div className="seasonPanel">
                            <select id ="seasonSelector" className="season-dropdown-menu setInline" onChange={() => this.handleSeasonChange()}>{this.getseasonOptions()}</select>
                    </div>
                    <FormGroup className="datepickerStyle setInline">
                        <ControlLabel className="text-center center-block">Select Date</ControlLabel>
                        <DatePicker id="schedule-datepicker" value={this.getDefaultDateValue()} onChange={this.handleDateChange} />
                    </FormGroup>
                </div>
                {
                    this.scheduleGroup.map((schedulelot,index) => (
                    <div key ={index}  className ="schedulePanelHolder">    
                        <h4 className="dateHeaderLabel">{schedulelot[0].date}</h4>
                        <div className ="outerTableWrapper">
                            <div className ="content-innerWrapper">
                            <table className="contentTable">
                                <thead>
                                    <tr className="ss-row tableLabel">
                                                            <th className ="matchLabel">Game</th>
                                                            <th className ="matchLabel"></th>
                                                            <th className ="timeName">Time</th>
                                                            <th className ="locationName">Location</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                
                                {
                                    schedulelot.map((schedule,index) => (
                                        
                                        <tr key ={schedule.id} className={"ss-row "+ (index%2==0 ?'even':'odd')}>
                                                <td><a>{schedule.awayTeam.City} {schedule.awayTeam.Name}</a></td>
                                                <td>at <a>{schedule.homeTeam.City}</a></td>
                                                <td>{schedule.time}</td>
                                                <td>{schedule.location}</td>
                                        </tr>
                                    ))
                                    

                                }
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    ))   
                }
                </div>
                </Loader>
    }
}

SchedulePanel.propTypes = {
  getSchedule : PropTypes.func.isRequired
};

export default connect(null,actionCreators,null,{
  pure: false
})(SchedulePanel);
