import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import StandingPanel from './StandingPanel';

class StandingsPage extends PureComponent{
  render() {
          return <div className="standings-holder">
            <div className="standings-content-wrapper">
               <div className="standings-content">
                    <StandingPanel {...this.props} />
              </div>
            </div>
          </div>;
  }
};

function mapNewsToProps(curr_feeds){
  return {
    standings:curr_feeds
  }
}

export const StandingsPageContainer = connect(mapNewsToProps,actionCreators)(StandingsPage);