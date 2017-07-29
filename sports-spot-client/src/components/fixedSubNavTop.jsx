/*jshint esversion: 6 */
import React, { Component} from 'react';
import subNav from './subNavbar';

class fixedSubNavTop extends Component {
         render() {
             return (
                 <div class="subNavTop">
                    <subNav  {...this.props}/> 
                </div>
             )
         }
}