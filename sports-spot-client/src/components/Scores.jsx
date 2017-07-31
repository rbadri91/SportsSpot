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
  render() {
          return <div className="scorecard-container">
            <div className ="sectionTitle">{this.getGameName()} Scoreboard</div>
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