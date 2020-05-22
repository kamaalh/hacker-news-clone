import React, { Component } from "react";
import "./App.css";
import FeedList from "./components/FeedList";

class App extends Component {
  state = { feeds: [] };

  componentDidMount() {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ feeds: data.hits });
      })
      .catch(console.log);
  }

  render() {
    const { feeds } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <img src="y18.gif" className="app-logo" alt="logo" />
        </header>
        <FeedList feeds={feeds}></FeedList>
        <footer className="app-footer">
          <div>
            <button>More</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
