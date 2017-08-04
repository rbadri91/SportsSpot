import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import ScorePanel from './ScorePanel';

class ScoresPage extends PureComponent{
  getGameName(){
    var game ='';
    var location = window.location.href;
    if(location.indexOf('nfl')!=-1){
            game = 'NFL';
        }else if(location.indexOf('nhl')!=-1){
             game = 'hhl';
        }else if(location.indexOf('mlb')!=-1){
             game = 'mlb';
        }else{
            game = 'nba';
        }
      return game;
  }
    getseasonOptions(){
      var startYear = 2017;
      var endYear = 2018;
      var options =[];
      for(var i=0;i<3;i++){
        options.push(<option value ='{startYear}-{endYear}-regular'>{startYear} Season</option>)
        startYear--;
        endYear--;
      }
      return options;
    }
  render() {
          return <div className="scorecard-container">
                     <ScorePanel {...this.props}/>
          </div>;
  }
};

function mapNewsToProps(curr_scores){
  return {
    scores:curr_scores
  }
}

export const ScorePageContainer = connect(mapNewsToProps,actionCreators)(ScoresPage);