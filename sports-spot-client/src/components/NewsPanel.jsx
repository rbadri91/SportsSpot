/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';

export default class NewsPanel extends PureComponent{
    getNews(){
        console.log("news here:",this.props.news);
        return this.props.news ||[];
    }
    render() {
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