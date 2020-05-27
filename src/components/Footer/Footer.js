import React from "react";

const Footer = ({ loadMoreFeeds, hideButton }) => {
  return (
    <footer className="app-footer">
      <div>{!hideButton && <button onClick={loadMoreFeeds}>More</button>}</div>
    </footer>
  );
};

export default Footer;
