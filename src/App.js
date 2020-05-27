import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FeedList from "./components/FeedList/FeedList";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = { feeds: [], page: 0, isLoading: false };
  baseUrl = `https://hn.algolia.com/api/v1/search?`;

  componentDidMount() {
    this.loadFrontPageFeeds();
  }

  loadFrontPageFeeds = () => {
    this.setState({ isLoading: true });
    fetch(`${this.baseUrl}tags=front_page`)
      .then((res) => res.json())
      .then((data) => this.setState({ feeds: data.hits, isLoading: false }))
      .catch(console.log);
  };

  loadMoreFeeds = () => {
    const { page } = this.state,
      nextPage = page + 1;
    this.setState({ isLoading: true });
    fetch(`${this.baseUrl}page=${nextPage}&hitsPerPage=20`)
      .then((res) => res.json())
      .then(({ hits, page }) =>
        this.setState({ feeds: hits, page, isLoading: false })
      );
  };

  render() {
    const { feeds, isLoading } = this.state;
    return (
      <>
        <Header />
        <FeedList feeds={feeds} showLoader={isLoading}></FeedList>
        <Footer loadMoreFeeds={this.loadMoreFeeds} hideButton={isLoading} />
      </>
    );
  }
}

export default App;
