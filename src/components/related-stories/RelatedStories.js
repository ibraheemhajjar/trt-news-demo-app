import React, { useState, useEffect } from "react";
import "./related-stories.css";
import { Link } from "react-router-dom";

const RelatedStories = (props) => {

     const [relatedNewsFeed, setRelatedNewsFeed] = useState([]);


     useEffect(() => {
          const pickRelatedNews = async () => {
               const startIndex = Math.abs((Math.floor(Math.random() * props?.data.length)) - 3)
               const relatedNews = props?.data.slice(startIndex, startIndex + 3)
               setRelatedNewsFeed(relatedNews);
          };
          pickRelatedNews();
     }, [props?.data]);


     return (
          <div className="related-stories-container">
               <div>
                    <h3 className="related-stories-heading">related stories</h3>
               </div>
               <div className="stories-container">
                    {relatedNewsFeed?.map((newsItem, index) => {
                         return (
                              <div className="related-news-item-container hover-action" key={index}>
                                   <Link to={newsItem?.path} className="related-news-item-link" >
                                        <p className="related-stories-item">{newsItem.title}</p>
                                   </Link>
                                   <div className="vertical-separator custom-separator"></div>
                              </div>
                         )
                    })}
               </div>
          </div>
     );
};

export default RelatedStories;
