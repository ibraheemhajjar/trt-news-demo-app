/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./custom-news.css";
import { Link } from "react-router-dom";
import { calculatePublishTime } from "../../helpers/calculatePublishTime";

const CustomNews = () => {
     const [customNews, setCustomNews] = useState([]);

     const fetchCustomNews = async () => {
          try {
               let url = `https://trt-news-backend-demo.vercel.app/CustomNews?showByLine=true`;
               const response = await fetch(url);
               const newsFeed = await response.json();
               setCustomNews(newsFeed.data);
          } catch (error) {
               console.log(error);
          }
     };


     useEffect(() => {
          fetchCustomNews()
     }, []);

     return (
          <div className="custom-container">
               <div className="custom-internal-container">
                    <div className="custom-section-heading">SELECTED NEWS</div>
                    <div className="custom-items-container">
                         {customNews.map((customNewsItem, index) => {
                              return (
                                   <Link to={customNewsItem?.path} key={index} className="custom-topic-link hover-action">
                                        <img src={customNewsItem?.mainImageUrl} alt="custom-news-img" className="custom-img" />
                                        <p className="custom-news-time">{calculatePublishTime(customNewsItem?.publishedDate)}</p>
                                        <h3 className="custom-news-heading">{customNewsItem?.title}</h3>
                                   </Link>
                              );
                         })}
                    </div>
               </div>
          </div>
     );
};

export default CustomNews;
