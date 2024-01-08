import React from 'react';
import "./footer.css";

const Footer = () => {

     const copyright = `Copyright © ${new Date().getFullYear()} TRT World`;

     return (
          <footer className="footer-container">
               <div className='footer'>
                    <div className="logo flex ali-cen jus-cen">
                         <img className="TRT" alt="Trt" src="https://generation-sessions.s3.amazonaws.com/227c7f2cdad7bffac6ab019057538501/img/trt.svg" />
                         <img
                              className="world"
                              alt="World"
                              src="https://generation-sessions.s3.amazonaws.com/227c7f2cdad7bffac6ab019057538501/img/world.svg"
                         />
                    </div>
                    <div className='copyright'>
                         <p style={{ color: 'white' }}>{copyright}</p>
                    </div>
               </div>
          </footer>
     )
}

export default Footer;