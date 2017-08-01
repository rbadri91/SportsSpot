import React ,{PureComponent} from 'react';

export default class ImpNewsPanel extends PureComponent{
    getImpNews(){
        return (this.props.news)?this.props.news.slice(0,7):[];
    }
    render() {
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
                                                        <li className= "headlineContent" key= {news.id}>
                                                            <a target ="_blank" className = "titleLink" href ={news.url}>{news.title}</a>
                                                        </li>
                                                    )
                                            }    
                                            </ul>
                                        </section>
                                
                            </section>
                        </section>
            </div>;
    }
}