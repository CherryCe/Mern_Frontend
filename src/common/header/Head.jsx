import React from "react";
import "./Header.css";

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <label> +84 966454404</label>
            <i className="fa fa-envelope"></i>
            <label> mrpii.2k3@gmail.com</label>
          </div>
          <div className="right row RText">
            <label>Theme FAQ"s</label>
            <label>Need Help?</label>
            <span>🏳️‍⚧️</span>
            <label>EN</label>
            <span>🏳️‍⚧️</span>
            <label>USD</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
