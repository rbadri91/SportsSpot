import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class subNavigation extends Component{
    handleNavClick(functionParam){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
                functionParam('nfl');
        }else if(currPath.indexOf('nhl')!=-1){
            functionParam('nhl');
        }else if(currPath.indexOf('mlb')!=-1){
            functionParam('mlb');
        }else{
             functionParam('nba');
        }
    }

    handleHomeClick(){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
                this.props.getCurrentNFLNews();
        }else if(currPath.indexOf('nhl')!=-1){
            this.props.getCurrentNHLNews();
        }else if(currPath.indexOf('mlb')!=-1){
            this.props.getCurrentMLBNews();
        }else{
             this.props.getCurrentNBANews();
        }
    }

    handleScheduleClick(functionParam){
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
                functionParam('nfl');
        }else if(currPath.indexOf('nhl')!=-1){
            functionParam('nhl');
        }else if(currPath.indexOf('mlb')!=-1){
            functionParam('mlb');
        }else{
             functionParam('nba');
        }
    }
    getHeader(){
        var header ='';
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
                header= 'NFL';
        }else if(currPath.indexOf('nhl')!=-1){
                header= 'NHL';
        }else if(currPath.indexOf('mlb')!=-1 ){
                header= 'MLB';
        }else if(currPath.indexOf('nba')!=-1){
                header= 'NBA';
        }
        return header;
    }
    getRalativePath(){
        var path ='';
        var currPath = window.location.href;
        if(currPath.indexOf('nfl')!=-1){
                path= '/nfl';
        }else if(currPath.indexOf('nhl')!=-1){
                path= '/nhl';
        }else if(currPath.indexOf('mlb')!=-1){
                path= '/mlb';
        }else if(currPath.indexOf('nba')!=-1){
                path= '/nba';
        }
        return path;
    }
  render() {
    return (
            <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {this.getHeader()}
                        </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer activeClassName="active" to={this.getRalativePath()+"/home"}>
                               <NavItem  eventKey={1} onClick={() => this.handleHomeClick()}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to={this.getRalativePath()+"/scores"}>
                               <NavItem value ={'nfl'} onClick={() => this.handleNavClick(this.props.getScores)} eventKey={2}>Scores</NavItem>
                            </LinkContainer>
                            <LinkContainer to={this.getRalativePath()+"/schedules"}>
                               <NavItem onClick={() => this.handleNavClick(this.props.getSchedule)} eventKey={3}>Schedule</NavItem>
                            </LinkContainer>
                            <LinkContainer to={this.getRalativePath()+"/standings"}>
                               <NavItem onClick={() => this.handleNavClick(this.props.getStandings)} eventKey={4}>Standings</NavItem>
                            </LinkContainer>
                            <LinkContainer to={this.getRalativePath()+"/stats"}>
                               <NavItem eventKey={5}>Stats</NavItem>
                            </LinkContainer> 
                            <LinkContainer to={this.getRalativePath()+"/teams"}>
                               <NavItem onClick={this.props.getTeams} eventKey={6}>Teams</NavItem>
                            </LinkContainer>  
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
  }
};
subNavigation.propTypes = {
  getScores : PropTypes.func.isRequired,
  getSchedule : PropTypes.func.isRequired,
  getStandings : PropTypes.func.isRequired,
  getTeams : PropTypes.func.isRequired,
  getCurrentNFLNews:PropTypes.func.isRequired,
  getCurrentMLBNews:PropTypes.func.isRequired,
  getCurrentNBANews:PropTypes.func.isRequired,
  getCurrentNHLNews:PropTypes.func.isRequired
};
export default connect(null,actionCreators,null,{
  pure: false
})(subNavigation);

