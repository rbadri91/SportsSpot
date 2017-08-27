import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
var Loader = require('react-loader');

var socket = io.connect('https://sportsspot.herokuapp.com:443', {secure: true});
// var socket = io.connect('http://localhost:8090');

export default class ImpNewsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:[]};
    }
    getImpNews(){
        this.state.dataloaded = false;
        return (this.state.response.length!==0)?this.state.response.slice(0,7):[];
    }
    getInitialState(){
        return {
        response: [],
        dataloaded : false
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

        if(this.state.response.length===0){
            return <div></div>;
        }

        return <div className = 'impNewsPanel col-sm-3'>
                        <section className="topNews_wrapper">
                            <section className="topNews_innerWrapper">
                                    <div className ="panelHeader">
                                        <h4 className="text-center">Top Headlines</h4>
                                    </div>
                                     <section className = "HealinesSecions">
                                            <ul className="HeadLinesList">
                                            {
                                                
                                                    this.getImpNews().map(news =>
                                                        <li key= {news.id} className= "headlineContent" >
                                                            <a target ="_blank" className = "titleLink" href ={news.url}>{news.title}</a>
                                                        </li>
                                                    )
                                            }    
                                            </ul>
                                        </section>
                                
                            </section>
                        </section>
        </div>

    }
}