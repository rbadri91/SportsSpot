/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';

export default class StandingsPanel extends PureComponent{
    
    constructor(props){
        super(props);
        this.division ="";
        this.subDivision="";
    }
    getDivision(divName){
        var divisionName ="";
        if(divName.indexOf("AFC")!=-1){
            divisionName = 'AFC';
        }else{
            divisionName = 'NFC';
        }
        return divisionName;
    }
    checkSameMainDivision(divisionName){
        if(this.division == divisionName){
            return true;
        }else{
            this.division = divisionName;
            return false;
        }
    }
    getSubDivision(divName){
            var subDivName = "";
            if(divName.indexOf('East')!=-1){
                subDivName ='East';
            }else if(divName.indexOf('North')!=-1){
                subDivName ='North';
            }else if(divName.indexOf('South')!=-1){
                subDivName ='South';
            }else {
                subDivName ='West';
            }
            return subDivName;
    }
    checkSameSubDiv(subDiv){
        if(this.subDivision ==subDiv){
            return true;
        }else{
            this.subDivision =subDiv;
            return false;
        }
    }
    render(){
        return (
            <div className ="standingsTableWrapper">
                    <div className ="standingsInnerWrapper">
                        {
                            this.getScores().map((division) =>
                        <table class="standing-table">
                            <tbody>
                                <tr class="title">
                                    <td>{this.getDivision(division.name)}</td>
                                </tr>
                            </tbody>
                        </table>
                        )}
                    </div>
            </div>
        )
    }
}