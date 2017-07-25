/*jshint esversion: 6 */
import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">SportsSpot</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <NavItem>Sign Up</NavItem>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="content">
                        {this.props.children}
                </div>
            </div>
        )
    }
}

MainNav.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainNav;