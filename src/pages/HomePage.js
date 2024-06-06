import React, { useState, useEffect, Fragment } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "../App.css";
import TopicsBar from "../components/topics-bar/Topics-bar";
import HeroNews from "../components/hero-news/HeroNews";
import RelatedStories from "../components/related-stories/RelatedStories";
import SecondaryHeroNews from "../components/secondary-hero-news/SecondaryHeroNews";
import Opinion from "../components/opinion/Opinion";
import RegionNews from "../components/region-news/RegionNews";
import PopularToday from "../components/popular-today/PopularToday";
import CustomNews from "../components/custom-news/CustomNews";
import NewsStreamItem from "../components/news-stream-item/NewsStreamItem";
import forumImage from "../images/Rectangle 3.jpg";
import forumLogo from "../images/106c8f506074a02db16635754b1cb39c.png";
import { NEWS_CATEGORIES_IDS } from "../constants/index";
import MoonLoader from "react-spinners/MoonLoader";

const HomePage = () => {
  const [news, setNews] = useState({
    newsData: [],
    activeNewsData: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isScrollLoading, setIsScrollLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [endOfResults, setEndOfResults] = useState(false);
  const itemsPerPage = 15;

  const { category } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
    setEndOfResults(false);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async (myCategory) => {
      try {
        let url = `https://trt-news-backend-demo.vercel.app/allNews`;
        if (myCategory) {
          const categoryId = NEWS_CATEGORIES_IDS[myCategory];
          url = `https://trt-news-backend-demo.vercel.app/filterNews?categoryId=${categoryId}`;
        }
        const response = await fetch(url);
        const newsFeed = await response.json();
        const sortedNews = newsFeed.data?.sort((a, b) => {
          const date1 = new Date(a.publishedDate);
          const date2 = new Date(b.publishedDate);
          return date1 - date2;
        });
        setNews({
          newsData: sortedNews,
          activeNewsData: sortedNews?.slice(0, itemsPerPage),
        });
        window.scrollTo(0, 0);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (category) {
      fetchNews(category);
    } else {
      fetchNews();
    }
  }, [category]);

  const loadMoreHandler = () => {
    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    if (news.activeNewsData?.length === news.newsData?.length) {
      setEndOfResults(true);
      return;
    }
    if (news.activeNewsData?.length + itemsPerPage > news.newsData?.length) {
      endIndex = undefined;
    }
    setIsScrollLoading(true);

    setTimeout(() => {
      setCurrentPage((prevState) => prevState + 1);
      setNews((prevState) => {
        const newNewsPatch = prevState.newsData.slice(startIndex, endIndex);
        const newActiveNewsData = prevState.activeNewsData.concat(newNewsPatch);
        return {
          ...prevState,
          activeNewsData: newActiveNewsData,
        };
      });
      setIsScrollLoading(false);
    }, 1000);
  };

  return (
    <Fragment>
      {!isLoading && (
        <main className="main-container" id="main">
          <TopicsBar />
          <div className="body-container">
            <div className="hero-container">
              <div className="hero-left-col">
                <HeroNews data={news?.activeNewsData} />
                <RelatedStories data={news?.activeNewsData} />
              </div>
              <div className="vertical-separator"></div>
              <div className="hero-mid-col">
                <SecondaryHeroNews data={news?.activeNewsData} />
              </div>
              <div className="vertical-separator"></div>
              <div className="hero-right-col">
                <Opinion />
                <div className="vertical-separator"></div>
                <RegionNews />
              </div>
            </div>
            <div className="horizontal-separator"></div>
            <PopularToday data={news?.newsData} />
          </div>
          <CustomNews />
          <div className="body-container custom-top-margin">
            <div className="stream-section-container">
              <NewsStreamItem
                isScrollLoading={isScrollLoading}
                loadMoreHandler={loadMoreHandler}
                endOfResults={endOfResults}
                data={news?.activeNewsData}
              />
              <div className="vertical-separator"></div>
              <Link
                to={"https://www.trtworldforum.com/"}
                target="_blank"
                className="forum-istanbul-container hover-action"
              >
                <h3 className="forum-istanbul-heading">trt world forum 2023</h3>
                <img
                  src={forumImage}
                  alt="forum istanbul"
                  className="forum-istanbul-img"
                />
                <h4 className="forum-over-image-text">Join digital Debates</h4>
                <img className="forum-logo" src={forumLogo} alt="forum logo" />
              </Link>
            </div>
          </div>
        </main>
      )}
      {isLoading && (
        <div className="loading-container">
          <MoonLoader color="#0089cc" size={40} />
        </div>
      )}
    </Fragment>
  );
};

export default HomePage;
