import React from "react";

const Footer = ({ loadMoreFeeds }) => {
  return (
    <footer className="app-footer">
      <div>
        <button onClick={loadMoreFeeds}>More</button>
      </div>
    </footer>
  );
};

export default Footer;
