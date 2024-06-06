import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./opinion.css";

const Opinion = () => {
  const [opinionNews, setOpinionNews] = useState([]);

  const fetchOpinionNews = async () => {
    try {
      let url = `https://trt-news-backend-demo.vercel.app/CustomNews?showAuthor=true`;
      const response = await fetch(url);
      const newsFeed = await response.json();
      setOpinionNews(newsFeed.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOpinionNews();
  }, []);

  return (
    <div className="opinions-container">
      {opinionNews.slice(0, 2).map((newsItem, index) => {
        return (
          <div className="opinion-item-container" key={index}>
            <Link
              to={newsItem.path}
              className="opinion-link-container hover-action"
            >
              <img
                src={newsItem?.authors[0].imageURL}
                alt="avatar-img"
                className="avatar-img"
              />
              <div className="opinion-text-container">
                <h3 className="opinion-author">
                  {newsItem?.authors[0].firstName +
                    " " +
                    newsItem?.authors[0].lastName}
                </h3>
                <p className="opinion-heading">{newsItem.title}</p>
              </div>
            </Link>
            <div className="horizontal-separator"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Opinion;
