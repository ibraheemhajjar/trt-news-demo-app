import React, { useState, useEffect, useRef } from 'react'
import "./search.css"
import SearchIcon from "@mui/icons-material/Search";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { calculatePublishTime } from "../../helpers/calculatePublishTime";



const Search = () => {

     const [searchInput, setSearchInput] = useState("");
     const [loadingSearch, setLoadingSearch] = useState(false);
     const [searchResult, setSearchResult] = useState([]);
     const [noResult, setNoResult] = useState(false);
     const [showPopup, setShowPopup] = useState(false);

     const isInitialRender = useRef(true);

     const handleSearchInputChange = (event) => {
          const newSearchInput = event.target.value;
          setSearchResult([])
          setSearchInput(newSearchInput);
          setNoResult(false);
     }

     const handleInputFocus = () => {
          setShowPopup(true);
          setTimeout(() => {
               setShowPopup(false);
          }, 3000);
     }

     useEffect(() => {
          if (isInitialRender.current) {
               isInitialRender.current = false;
               return;
          }

          let searchTimer;
          const triggerSearch = async () => {
               if (searchInput?.length < 3) return;
               setLoadingSearch(true);
               try {
                    let url = `https://gifted-clam-waistcoat.cyclic.app/search?searchQuery=${searchInput}`;
                    const response = await fetch(url);
                    const searchResult = await response.json();
                    setSearchResult(searchResult?.data);
                    if (searchResult?.data?.length === 0) setNoResult(true);
                    setLoadingSearch(false);
               } catch (error) {
                    console.log(error);
               }
          };

          searchTimer = setTimeout(triggerSearch, 800);

          return () => {
               clearTimeout(searchTimer);
          };
     }, [searchInput]);

     return (
          <div className='search-grand-container'>
               <div className='search-bar-extensible-container'>
                    <div className='search-bar-container'>
                         <SearchIcon className="icon-search" />
                         <div className="search-input-container">
                              <input type="text" className="search-input" onFocus={handleInputFocus} placeholder="Search For NEWS" onChange={handleSearchInputChange} />
                              {loadingSearch &&
                                   <div className="search-loading-container">
                                        <ClipLoader
                                             color="#0089cc"
                                             size={22}
                                        />
                                   </div>
                              }
                              {showPopup && <div className="search-popup">Title or Description, at Least 3 Characters </div>}
                         </div>
                    </div>
               </div>
               <div className='search-results-extensible-container'>
                    <div className='search-results-outer-container'>
                         {!isInitialRender.current && noResult && <p className='no-results'>No Results Found</p>}
                         <div className='search-results-inner-container'>
                              {searchResult?.map((resultItem, index) => {
                                   return (
                                        <Link to={resultItem?.path} className='result-item-container' key={index}>
                                             <div className='result-img-container'>
                                                  <img src={resultItem?.mainImageUrl} alt='news-banner' className='result-item-image' />
                                             </div>
                                             <div className="result-text-container">
                                                  <h2 className='result-heading'>{resultItem?.title}</h2>
                                                  <p className='result-description'>{resultItem?.description}</p>
                                                  <p className='result-publish-time'>{calculatePublishTime(resultItem?.publishedDate)}</p>
                                             </div>
                                        </Link>
                                   )
                              })}
                         </div>
                    </div>
               </div>
          </div>
     )
}
export default Search