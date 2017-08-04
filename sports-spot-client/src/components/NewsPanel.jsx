/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';
import io from 'socket.io-client';
const socket = io(`${location.protocol}//${location.hostname}:8090`);

export default class NewsPanel extends PureComponent{
    constructor(props){
        super(props);
        this.state={response:[]}
    }
    getNews(){
        return this.props.news ||[];
    }
    getInitialState(){
        return {
        response: []
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
        if(this.state.response.length ==0)
        {
                    return <div>Loading ....</div>;
        }
        return <div className = 'newsPanel col-sm-9'>
            {
                this.getNews().map(news =>
                    <article key={news.id} className="contentWrapper">
                        <a  target="_blank" className="newsImage" href={news.url}>
                            <figure className="news-wrapper">
                                <picture className="news-image-wrapper">
                                    <img alt ={news.title} className="image_wrapper" src = {news.image}/>
                                </picture>
                            </figure>
                        </a>
                        <section className="info_wrapper">
                            <section className="info_innerWrapper">
                                <a className="info_linker" target="_blank" href={news.url}>
                                <div className="author_holder">
                                    <span>{news.source.title}</span>
                                </div>
                                <div  className="newsTitle">
                                    <h2>{news.title}</h2>
                                </div>
                                <div className ="newsDescription">
                                    <h5>{news.body}</h5>
                                </div>
                                </a>
                            </section>
                        </section>
                    </article>
            )}
        </div>;
    }
}