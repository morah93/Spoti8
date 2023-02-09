import React from "react";
import './footer.css'

const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="info">
        © 2022 WhereBnb
          Privacy
          Terms
          Sitemap
          Destination
        </div>
        {/* <div className="Privacy">

        </div>
        <div className="Terms">

        </div>
        <div className="SiteMap">

        </div>
        <div className="destination">

        </div> */}
      <div className="siteInfo">
        <i id="globeIcon" className="fa fa-globe"></i>
          <div id="language">English (US)</div>
          <i id="dollarIcon" className="fa fa-dollar" ></i>
          USD
          <i id="fbIcon" className="fa fa-facebook"></i>
          <i id="twtIcon" className="fa fa-twitter"></i>
          <i id="igIcon" className="fa fa-instagram"></i>
      </div>
      </div>
    </>
  )
}

export default Footer
