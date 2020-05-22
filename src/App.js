import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FeedList from "./components/FeedList/FeedList";
import Footer from "./components/Footer/Footer";

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
      <>
        <Header />
        <FeedList feeds={feeds}></FeedList>
        <Footer />
      </>
    );
  }
}

export default App;
