/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import io from 'socket.io-client';


const socket = io(`${location.protocol}//${location.hostname}:8090`);

export default class SchedulePanel extends PureComponent{
    
    constructor(props){
        super(props);
        this.state={response:{}}
        var d = new Date();
        this.currentDate = d.getFullYear()+"-"+d.getMonth()+ "-"+ d.getDate();
        this.week ="0";
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
        return {
        response: {}
        }
    }
    componentDidMount()
    {
        socket.once("curr_news",(data)=>{
                 this.setState({response:data});
         })
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
    render() {
            if(Object.keys(this.state.response).length ==0)
            {
                        return <div>Loading ....</div>;
            }

            const scheduleGroup = this.chunk(this.state.response);

            return <div className = 'schedulePanel'>
                
                {
                    scheduleGroup.map((schedulelot,index) => (
                    <div key ={index}  className ="schedulePanelHolder">    
                        <h4 className="dateHeaderLabel">{schedulelot[0].date}</h4>
                        <div className ="outerTableWrapper">
                            <div className ="content-innerWrapper">
                            <table className="scheduleData">
                                <thead>
                                    <tr className="ss-row tablelabel">
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
    }
}