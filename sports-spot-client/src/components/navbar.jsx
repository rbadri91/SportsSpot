/*jshint esversion: 6 */
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem,NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class MainNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
         loggedIn: 1,
        };
    }
    render() {
        return (
            <div>
                <Navbar inverse fixedTop collapseOnSelect style={{background:"#5959c5",color:"white"}}>
                    <Navbar.Header>
                    <LinkContainer to={`/`} style={{cursor:"pointer",color:"white"}}>    
                        <Navbar.Brand onClick={this.props.getCurrentALLNews}>
                          SportsSpot
                        </Navbar.Brand>
                    </LinkContainer>    
                    <Navbar.Toggle />   
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={`/nfl`} style={{color:"white"}} >
                                <NavItem onClick={this.props.getCurrentNFLNews} eventKey={1}>NFL</NavItem>
                            </LinkContainer>
                            <LinkContainer to = {`/mlb`} style={{color:"white"}}>
                               <NavItem onClick={this.props.getCurrentMLBNews} eventKey={2} >MLB</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/nba`} style={{color:"white"}}>
                               <NavItem onClick={this.props.getCurrentNBANews} eventKey={3} >NBA</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/nhl`} style={{color:"white"}}>
                               <NavItem onClick={this.props.getCurrentNHLNews} eventKey={4}>NHL</NavItem>
                            </LinkContainer>   
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
        )
    }
}

MainNav.propTypes = {
  getCurrentNHLNews : PropTypes.func.isRequired,
  getCurrentMLBNews : PropTypes.func.isRequired,
  getCurrentNFLNews : PropTypes.func.isRequired,
  getCurrentNBANews : PropTypes.func.isRequired,
  getCurrentALLNews : PropTypes.func.isRequired
};

export default connect(null,actionCreators,null,{
  pure: false
})(MainNav);
// export default MainNav;
