import React from "react";
import "./topics-bar.css";
import { NavLink } from "react-router-dom";

const TopicsBar = () => {
     return (
          <div className="topics-bar-container">
               <div className="topics-bar">
                    <div className="topics">TOPICS</div>
                    <NavLink to={"/Turkiye"} className="topic-item">TURKIYE</NavLink>
                    <NavLink to={"/Climate"} className="topic-item">Climate</NavLink>
                    <NavLink to={"/USCanada"} className="topic-item">US & Canada</NavLink>
                    <NavLink to={"/Business"} className="topic-item">Business</NavLink>
                    <NavLink to={"/Discrimination"} className="topic-item">Discrimination</NavLink>
                    {/* <NavLink to={"/ScienceTech"} className="topic-item">Science & Tech</NavLink> */}
               </div>
          </div>
     );
};

export default TopicsBar;
