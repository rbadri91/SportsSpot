import React ,{PureComponent}from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import SchedulePanel from './SchedulePanel';

class SchedulePage extends PureComponent{
  render() {
          return <div className="schedule-holder">
            <div className="schedule-content-wrapper">
                <div className="schedule-content">
                    <SchedulePanel {...this.props} />
                </div> 
              </div>
          </div>;
  }
};

function mapNewsToProps(schedule){
  return {
    schedule:schedule
  }
}

export const SchedulePageContainer = connect(mapNewsToProps,actionCreators)(SchedulePage);