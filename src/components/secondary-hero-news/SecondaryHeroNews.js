import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./secondary-hero-news.css";

const SecondaryHeroNews = (props) => {
     const [secondaryHeroState, setSecondaryHeroState] = useState([]);

     useEffect(() => {
          setSecondaryHeroState(props.data?.slice(1, 3))
     }, [props.data]);

     return (
          <div className="secondary-hero-news-container">
               {secondaryHeroState?.map((item, index) => {
                    return (
                         <Link to={item?.path}
                              key={index}
                              className="secondary-item-container hover-action"
                         >
                              <img src={item?.mainImageUrl} alt="news-img" className="hero-img" />
                              <h2 className="secondary-hero-heading">{item?.title}</h2>
                              <p className="secondary-hero-desc">{item?.description}</p>
                              <div className="horizontal-separator"></div>
                         </Link>
                    );
               })}
          </div>
     );
};

export default SecondaryHeroNews;
