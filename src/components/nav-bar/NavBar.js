import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav-bar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import SearchIcon from "@mui/icons-material/Search";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import CloseIcon from '@mui/icons-material/Close';
import DropdownMenu from "../dropdown-menu/DropdownMenu";

const NavBar = (props) => {
     const [showNewsDropdownMenu, setShowNewsDropdownMenu] = useState(false);
     const [showTopicsDropdownMenu, setShowTopicsDropdownMenu] = useState(false);
     const [showMobileMenu, setShowMobileMenu] = useState(false);

     const location = useLocation();

     useEffect(() => {
          document.body.style.overflow = "auto";
     }, [location]);

     const toggleMobileMenu = () => {
          setShowMobileMenu(prevState => !prevState)
          props.hideSearchBar()
          if (showMobileMenu) {
               document.body.style.overflow = "auto";
          } else {
               document.body.style.overflow = "hidden";
          }
     }

     const toggleSearchBar = () => {
          props.toggleSearchBar();
          if (props.showSearchIcon) {
               document.body.style.overflow = "hidden";
          } else {
               document.body.style.overflow = "auto";
          }
          setShowMobileMenu(false)
     }

     const goHome = () => {
          setShowMobileMenu(false);
          document.body.style.overflow = "auto";
     }

     const newsDropdownContent = [
          { "AFRICA": "/Africa" },
          { "ASIA": "/Asia" },
          { "AUSTRALIA": "/Australia" },
          { "TURKIYE": "/Turkiye" },
          { "US & CANADA": "/USCanada" },
          { "LATIN AMERICA": "/LatinAmerica" },
          { "EUROPE": "/Europe" },
          { "MIDDLE EAST": "/MiddleEast" },
     ]

     const topicsDropdownContent = [
          // { "SCIENCE & TECH": "/ScienceTech" },
          { "CLIMATE": "/Climate" },
          { "ART & CULTURE": "/ArtsCulture" },
          { "BUSINESS": "/Business" },
          // { "PERSPECTIVES": "/Perspectives" },
          // { "MAGAZINE": "/Magazine" },
          { "DISCRIMINATION": "/Discrimination" },
     ]

     return (
          <Fragment>
               <header className="header-container">
                    <div className="nav-bar">
                         <Link onClick={goHome} className="nav-link logo">
                              <img className="TRT" alt="Trt" src="https://generation-sessions.s3.amazonaws.com/227c7f2cdad7bffac6ab019057538501/img/trt.svg" />
                              <img
                                   className="world"
                                   alt="World"
                                   src="https://generation-sessions.s3.amazonaws.com/227c7f2cdad7bffac6ab019057538501/img/world.svg"
                              />
                         </Link>
                         <nav className="menus-container">
                              <div
                                   className="menu-item-container no-mobile"
                                   onMouseOver={() => setShowNewsDropdownMenu(true)}
                                   onMouseLeave={() => setShowNewsDropdownMenu(false)}
                                   onClick={() => setShowNewsDropdownMenu(false)}
                              >
                                   <div className="menu-item">NEWS</div>
                                   <DropdownMenu content={newsDropdownContent} showDropdownMenu={showNewsDropdownMenu} />
                                   <ExpandMoreIcon className="dropdown-arrow" />
                              </div>
                              <div
                                   className="menu-item-container no-mobile"
                                   onMouseOver={() => setShowTopicsDropdownMenu(true)}
                                   onMouseLeave={() => setShowTopicsDropdownMenu(false)}
                                   onClick={() => setShowTopicsDropdownMenu(false)}
                              >
                                   <div className="menu-item">TOPICS</div>
                                   <DropdownMenu content={topicsDropdownContent} showDropdownMenu={showTopicsDropdownMenu} />
                                   <ExpandMoreIcon className="dropdown-arrow" />
                              </div>
                              <Link
                                   to={"https://www.trtworld.com/live-stream"}
                                   target="_blank"
                                   className="menu-item-container">
                                   <FiberManualRecordSharpIcon className="live-red-dot" />
                                   <div className="menu-item">LIVE</div>
                              </Link>
                              {!showMobileMenu && <div className="mobile-menu-container mobile-menu" onClick={toggleMobileMenu}>
                                   <DensitySmallIcon className="search-icon mobile-menu-icon" />
                              </div>
                              }
                              {showMobileMenu && <div className="close-icon-container mobile-menu" onClick={toggleMobileMenu}>
                                   <CloseIcon className="close-icon" />
                              </div>}
                              <div onClick={toggleSearchBar} className="search-icon-container">
                                   {props.showSearchIcon && <SearchIcon className="search-icon" />}
                                   {!props.showSearchIcon && <CloseIcon className="search-icon" />}
                              </div>
                         </nav>
                    </div>
               </header>
               {showMobileMenu &&
                    <div className="mobile-menu-component" >
                         <div>
                              <h2 className="mobile-menu-heading">NEWS</h2>
                              <div className="horizontal-separator"></div>
                              {newsDropdownContent?.map((menuItem, index) => {
                                   return (
                                        <Link
                                             onClick={toggleMobileMenu}
                                             to={Object.values(menuItem)[0]}
                                             key={index}
                                             className="dropdown-item menu-item larger-menu-item"
                                        >
                                             {Object.keys(menuItem)[0]}
                                        </Link>
                                   )
                              })}
                         </div>
                         <div>
                              <h2 className="mobile-menu-heading">TOPICS</h2>
                              <div className="horizontal-separator"></div>
                              {topicsDropdownContent?.map((menuItem, index) => {
                                   return (
                                        <Link
                                             to={Object.values(menuItem)[0]}
                                             key={index}
                                             className="dropdown-item menu-item larger-menu-item"
                                             onClick={toggleMobileMenu}
                                        >
                                             {Object.keys(menuItem)[0]}
                                        </Link>
                                   )
                              })}
                         </div>
                    </div>
               }
          </Fragment>
     );
};

export default NavBar;
