import React, { useState, useEffect } from "react";
import "./popular-today.css";
import { Link } from "react-router-dom";

const PopularToday = (props) => {

     const [mostPopularNews, setMostPopularNews] = useState([]);

     useEffect(() => {
          const sortedNews = props.data?.sort((a, b) => {
               return new Date(a.publishedDate) - new Date(b.publishedDate);
          })
          setMostPopularNews(sortedNews?.slice(0, 4));
     }, [props.data]);

     return (
          <div className="popular-container">
               <div className="popular-section-heading">MOST Popular</div>
               <div className="popular-items-container">
                    {mostPopularNews?.map((item, index) => {
                         return (
                              <div className="popular-item-container hover-action" key={index}>
                                   <div className="popular-order">{index + 1}</div>
                                   <Link to={item.path} className="popular-text-container">
                                        <h3 className="popular-tag">{item?.categories?.[2]?.title || item?.categories?.[1]?.title}</h3>
                                        <p className="popular-heading">{item.title}</p>
                                   </Link>
                                   <div className="vertical-separator" id="vertical-separator"></div>
                              </div>
                         );
                    })}
               </div>
          </div>
     );
};

export default PopularToday;
