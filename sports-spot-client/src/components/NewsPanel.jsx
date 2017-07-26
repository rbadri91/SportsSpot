/*jshint esversion: 6 */
import React ,{PureComponent} from 'react';

export default class NewsPanel extends PureComponent{
    getNews(){
        console.log("this.props.news :",this.props.news);
        return this.props.news ||[];
    }
    render() {
        return <div className = 'newsPanel'>
            {
                this.getNews().map(news =>
                    <article key={news.title} className="contentWrapper">
                        <a  target="_blank" className="newsImage" href={news.url}>
                            <figure className="news-wrapper">
                                <picture className="news-image-wrapper">
                                    <img alt ={news.title} className="image_wrapper" src = {news.urlToImage}/>
                                </picture>
                            </figure>
                        </a>
                        <section className="info_wrapper">
                            <section className="info_innerWrapper">
                                <a className="info_linker" target="_blank" href={news.url}>
                                <div className="author_holder">
                                    <span>{news.author}</span>
                                </div>
                                <div  className="newsTitle">
                                    <h2>{news.title}</h2>
                                </div>
                                <div className ="newsDescription">
                                    <h5>{news.description}</h5>
                                </div>
                                </a>
                            </section>
                        </section>
                    </article>
            )}
        </div>;
    }
}