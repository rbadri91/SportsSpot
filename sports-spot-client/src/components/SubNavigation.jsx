import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class subNavigation extends Component{
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
                               <NavItem>Home</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/scores"}>
                               <NavItem>Scores</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/schedules"}>
                               <NavItem>Schedule</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/standings"}>
                               <NavItem >Standings</NavItem>
                            </LinkContainer>
                            <LinkContainer to={"/stats"}>
                               <NavItem>Stats</NavItem>
                            </LinkContainer> 
                            <LinkContainer to={"/teams"}>
                               <NavItem>Teams</NavItem>
                            </LinkContainer>  
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );
  }
};
export default connect(null,actionCreators)(subNavigation);

