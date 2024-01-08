/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import "./news-detail.css";
import { calculatePublishTime } from "../../helpers/calculatePublishTime";
import { useParams, useLocation } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import keyword_extractor from "keyword-extractor";




const NewsDetail = () => {
     const { category, newsId } = useParams();
     const [newsDetail, setNewsDetail] = useState({});
     const [isLoading, setIsLoading] = useState(false);

     const [keywords, setKeywords] = useState([]);

     const location = useLocation();


     useEffect(() => {
          setIsLoading(true);
          const fetchNews = async (myCategory, myNewsId) => {
               try {
                    let url = `https://gifted-clam-waistcoat.cyclic.app/${myCategory}/${myNewsId}`;
                    const response = await fetch(url);
                    const newsFeed = await response.json();
                    setNewsDetail(newsFeed?.data);
                    const extraction_result = keyword_extractor.extract(newsFeed?.data?.title, {
                         language: "english",
                         remove_digits: true,
                         return_changed_case: true,
                         remove_duplicates: true
                    });
                    setKeywords(extraction_result);
                    setIsLoading(false);
               } catch (error) {
                    console.log(error);
               }
          };

          if (category && newsId) {
               fetchNews(category, newsId);
          }
     }, [location]);

     useEffect(() => {
          window.scrollTo(0, 0);
     }, [location]);

     return (
          <Fragment>
               {!isLoading &&
                    <div className="news-detail-page-container">
                         <div className="header-text-out-container">
                              <div className="header-text-container">
                                   <div className="topic-time-container">
                                        <div className="topic">{category.replaceAll("-", " ")}</div>
                                        <div className="published-time">{calculatePublishTime(newsDetail?.publishedDate)}</div>
                                   </div>
                                   <h1 className="news-detail-heading">{newsDetail?.title}</h1>
                                   <p className="news-detail-description">{newsDetail?.description}</p>
                              </div>
                         </div>
                         <div className="news-body-container">
                              <div className="main-news-column">
                                   <div>
                                        <img src={newsDetail?.mainImageUrl} alt="head-img" className="news-detail-img" />
                                        <div className="paragraphs_container">
                                             {[1, 2, 3, 4, 5, 6].map((_, index) => {
                                                  return (
                                                       <p className="paragraph" key={index}>
                                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa officiis harum rerum placeat, quisquam quo
                                                            dolore itaque illum ex sit, tempore officia corporis assumenda a cum aspernatur. Quod, praesentium?
                                                            Repudiandae error et a, aliquid pariatur repellendus rem eaque vitae commodi eos id excepturi illum similique
                                                            atque? Quod similique qui vero.
                                                       </p>
                                                  )
                                             })}
                                        </div>
                                   </div>
                              </div>
                              <div className="vertical-separator"></div>
                              <div className="related-column">
                                   <div className="keyWords">
                                        {keywords?.map((keyword, index) => {
                                             return <p className="keyword" key={index}>{keyword}</p>
                                        })}
                                   </div>
                                   <div></div>
                              </div>
                         </div>
                    </div>
               }
               {isLoading &&
                    <div className="loading-container">
                         <MoonLoader
                              color="#0089cc"
                              size={40}
                         />
                    </div>}
          </Fragment>
     );
};

export default NewsDetail;
