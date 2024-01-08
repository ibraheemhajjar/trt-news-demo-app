import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/nav-bar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";

const RootLayout = () => {

     const [showSearchBar, setShowSearchBar] = useState(false);
     const location = useLocation();

     const toggleSearchBar = () => {
          setShowSearchBar(prevState => !prevState)
     }
     const hideSearchBar = () => {
          setShowSearchBar(false);
     }

     useEffect(() => {
          setShowSearchBar(false);
     }, [location])


     return (
          <Fragment>
               <NavBar toggleSearchBar={toggleSearchBar} hideSearchBar={hideSearchBar} showSearchIcon={!showSearchBar} />
               {showSearchBar && <Search />}
               <Outlet />
               <Footer />
          </Fragment>
     );
};

export default RootLayout;
