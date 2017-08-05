import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import TeamsPanel from './TeamsPanel';

class TeamsPage extends PureComponent{
  render() {
          return <div className="standings-holder">
            <div className="standings-content-wrapper">
               <div className="standings-content">
                    <TeamsPanel {...this.props} />
                </div> 
              </div>
          </div>;
  }
};

function mapNewsToProps(curr_teams){
  return {
    teams:curr_teams
  }
}

export const TeamsPageContainer = connect(mapNewsToProps,actionCreators)(TeamsPage);