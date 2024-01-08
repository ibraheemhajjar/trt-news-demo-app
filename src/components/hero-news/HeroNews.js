import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./hero-news.css";

const HeroNews = (props) => {

     const [heroComponentState, setHeroComponentState] = useState([]);
     useEffect(() => {
          setHeroComponentState(props.data?.slice(0, 1))
     }, [props.data]);


     return (
          <Link to={heroComponentState?.[0]?.path} className="hero-news-container hover-action">
               <p className="news-tag">{heroComponentState?.[0]?.categories?.[1]?.title}</p>
               <img src={heroComponentState?.[0]?.mainImageUrl} alt="news-img" className="hero-img" />
               <h1 className="hero-heading">{heroComponentState?.[0]?.title}</h1>
          </Link>
     );
};

export default HeroNews;
