import React from "react";
import { Link } from "react-router-dom";
import "./dropdown-menu.css";

const DropdownMenu = (props) => {
     return (
          <div>
               {props.showDropdownMenu && (
                    <div className="dropdown-menu">
                         {props.content.map((menuItem, index) => {
                              return (
                                   <Link to={Object.values(menuItem)[0]}
                                        key={index}
                                        className="dropdown-item menu-item"
                                   >
                                        {Object.keys(menuItem)[0]}
                                   </Link>
                              )
                         })}
                    </div>
               )}
          </div>
     );
};

export default DropdownMenu;
