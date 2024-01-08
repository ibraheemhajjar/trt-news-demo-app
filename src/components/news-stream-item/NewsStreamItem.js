import React, { useState, useEffect } from "react";
import "./news-stream-item.css";
import { Link } from "react-router-dom";
import { calculatePublishTime } from "../../helpers/calculatePublishTime";

const NewsStreamItem = (props) => {

     const [newsStreamState, setNewsStreamState] = useState([]);

     useEffect(() => {
          setNewsStreamState(props.data?.slice(3));
     }, [props.data]);

     return (
          <div className="news-stream-container">
               {newsStreamState?.map((newsItem, index) => {
                    return (
                         <div className="item-outer-container" key={index}>
                              <Link to={newsItem?.path} className="item-container hover-action">
                                   <div className="img-container">
                                        <img src={newsItem?.mainImageUrl} alt="news-img" className="news-stream-img" />
                                   </div>
                                   <div className="text-container">
                                        <div className="news-info">
                                             <p className="news-category">{newsItem?.categories[1]?.title}</p>
                                             <p className="news-time">{calculatePublishTime(newsItem?.publishedDate)}</p>
                                        </div>
                                        <h3 className="news-heading">{newsItem?.title}</h3>
                                        <p className="news-description">{newsItem?.description}</p>
                                   </div>
                              </Link>
                              <div className="horizontal-separator"></div>
                         </div>
                    );
               })}
          </div>
     );
};

export default NewsStreamItem;
