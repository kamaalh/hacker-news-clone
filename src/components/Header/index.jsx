import React from "react";
import "./style.css";

const toggle = () => {
  document.querySelectorAll(".sort").forEach(function (item) {
    item.classList.toggle("active");
  });
};

const Header = () => {
  return (
    <header className="app-header">
      <div>
        <img src="y18.gif" className="app-logo" alt="logo" />
        <span className="left-pad active sort" onClick={toggle}>
          top
        </span>
        <span className="left-pad">|</span>
        <span className="left-pad sort" onClick={toggle}>
          new
        </span>
      </div>
    </header>
  );
};

export default Header;
