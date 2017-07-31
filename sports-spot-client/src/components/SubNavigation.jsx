import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class subNavigation extends Component{
    handleScoresClick(functionParam){
        var currPath = window.location.href;
        console.log("location:",window.location.pathname);
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

    handleScheduleClick(functionParam){
        var currPath = window.location.href;
        console.log("location:",window.location.pathname);
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
    handleStatsClick(functionParam){
        var currPath = window.location.href;
        console.log("location:",window.location.pathname);
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
    handleStandingsClick(functionParam){
        var currPath = window.location.href;
        console.log("location:",window.location.pathname);
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
    getRalativePath(){
        var path ='';
        var currPath = window.location.href;
        console.log("location:",currPath);
        if(currPath.indexOf('nfl')!=-1){
                path= 'nfl';
        }else if(currPath.indexOf('nhl')!=-1){
                path= 'nhl';
        }else if(currPath.indexOf('mlb')!=-1){
                path= 'mlb';
        }else{
                path= 'nba';
        }
        return path;
    }
  render() {
    return (
            <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            NFL
                        </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={"/"}>
                               <NavItem  eventKey={1}>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to={this.getRalativePath()+ "/scores"}>
                               <NavItem value ={'nfl'} onClick={() => this.handleScoresClick(this.props.getScores)} eventKey={2}>Scores</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/schedules"}>
                               <NavItem onClick={() => this.handleScheduleClick(this.props.getSchedule)} eventKey={3}>Schedule</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/standings"}>
                               <NavItem onClick={() => this.handleScheduleClick(this.props.getStandings)} eventKey={4}>Standings</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/stats"}>
                               <NavItem onClick={() => this.handleScheduleClick(this.props.getStats)} eventKey={5}>Stats</NavItem>
                            </LinkContainer> 
                            <LinkContainer to={"/teams"}>
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
  getStats : PropTypes.func.isRequired,
  getTeams : PropTypes.func.isRequired
};
export default connect(null,actionCreators)(subNavigation);

