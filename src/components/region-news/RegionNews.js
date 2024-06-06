import React, { useState, useEffect } from "react";
import "./region-news.css";
import { Link } from "react-router-dom";

const RegionNews = () => {
  const [regionNewsFeed, setRegionNewsFeed] = useState([]);

  const fetchRegionNews = async () => {
    try {
      let url = `https://trt-news-backend-demo.vercel.app/allNews`;
      const response = await fetch(url);
      const newsFeed = await response.json();
      const startIndex = Math.abs(
        Math.floor(Math.random() * newsFeed?.data?.length) - 3
      );
      const regionNews = newsFeed?.data.slice(startIndex, startIndex + 4);
      setRegionNewsFeed(regionNews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegionNews();
  }, []);

  return (
    <div className="region-news-container">
      {regionNewsFeed.map((newsItem, index) => {
        return (
          <div className="region-news-item-container" key={index}>
            <Link
              to={newsItem?.path}
              className="region-item-container hover-action"
            >
              <h4 className="region-news-tag">
                {newsItem?.categories[1].title}
              </h4>
              <p className="region-news-heading">{newsItem.title}</p>
            </Link>
            <div className="horizontal-separator"></div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionNews;
