import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
var chunk = require('lodash.chunk');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

export default class ScorePanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:{}};
    }
    getInitialState(){
        return {
        response: {}
        }
    }
    componentDidMount()
    {
        socket.on("curr_news",(data)=>{
                 this.setState({response:data});
         });
    }
    componentWillUnmount(){
        socket.removeAllListeners("curr_news");
    }
    render() {
        
    }
}