import React ,{ PropTypes ,PureComponent}from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewsPanel from './NewsPanel';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


class HomePage extends PureComponent{
  render() {
          return <div className="news-holder">
            <div className="containerWrapper">
              <div className="s-row">
                <div className="col-sm-12">
                  <NewsPanel {...this.props} />
                </div> 
              </div>
            </div>
          </div>;
  }
};

function mapNewsToProps(curr_all_news){
  console.log("curr_all_news here:",curr_all_news);
  return {
    news:curr_all_news
  }
}
export const HomePageContainer = connect(mapNewsToProps,actionCreators)(HomePage);