import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


class StandingsPage extends PureComponent{
  render() {
          return <div className="news-holder">
            <div className="containerWrapper">
              <div className="s-row">
                <div className="col-sm-12">
                    Standings Page
                </div> 
              </div>
            </div>
          </div>;
  }
};

function mapNewsToProps(curr_scores){
  return {
    scores:curr_scores
  }
}

export const StandingsPageContainer = connect(mapNewsToProps,actionCreators)(StandingsPage);