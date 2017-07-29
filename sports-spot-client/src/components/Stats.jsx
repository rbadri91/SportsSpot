import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


class StatsPage extends PureComponent{
  render() {
          return <div className="news-holder">
            <div className="containerWrapper">
              <div className="s-row">
                <div className="col-sm-12">
                    Stats Page
                </div> 
              </div>
            </div>
          </div>;
  }
};

function mapStatsToProps(curr_stats){
  return {
    stats:curr_stats
  }
}

export const StatsPageContainer = connect(mapStatsToProps,actionCreators)(StatsPage);