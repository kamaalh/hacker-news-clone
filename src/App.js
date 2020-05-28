import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FeedList from "./components/FeedList/FeedList";
import Footer from "./components/Footer/Footer";

const LS = window.localStorage;
class App extends Component {
  state = { feeds: [], page: 0, isLoading: false };
  baseUrl = `https://hn.algolia.com/api/v1/search?`;

  componentDidMount() {
    this.initFeedStorage();
    this.loadFrontPageFeeds();
  }

  initFeedStorage = () => {
    if (!LS.getItem("hiddenFeeds")) {
      LS.setItem("hiddenFeeds", JSON.stringify([]));
    }
  };

  loadFrontPageFeeds = () => {
    this.setState({ isLoading: true });
    fetch(`${this.baseUrl}tags=front_page`)
      .then((res) => res.json())
      .then(({ hits, page }) => this.filterFeeds(hits, page))
      .catch(console.log);
  };

  loadMoreFeeds = () => {
    const { page } = this.state,
      nextPage = page + 1;
    this.setState({ isLoading: true });
    fetch(`${this.baseUrl}page=${nextPage}&hitsPerPage=20`)
      .then((res) => res.json())
      .then(({ hits, page }) => this.filterFeeds(hits, page));
  };

  getCurrentPageHiddenFeeds = (page) => {
    const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
    return hiddenFeeds[page] || [];
  };

  filterFeeds = (feeds, page) => {
    const curPageHiddenFeeds = this.getCurrentPageHiddenFeeds(page);
    const filteredFeeds = feeds.filter((feed) => {
      return !curPageHiddenFeeds.includes(feed.objectID);
    });
    this.setState({ feeds: filteredFeeds, page, isLoading: false });
  };

  hideFeed = (feedId) => {
    const curPage = this.state.page;
    const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
    const curPageHiddenFeeds = hiddenFeeds[curPage] || [];
    curPageHiddenFeeds.push(feedId);
    hiddenFeeds[curPage] = curPageHiddenFeeds;
    LS.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    this.filterFeeds(this.state.feeds, curPage);
  };

  render() {
    const { feeds, isLoading } = this.state;
    return (
      <>
        <Header />
        <FeedList
          feeds={feeds}
          showLoader={isLoading}
          hideFeed={this.hideFeed}
        ></FeedList>
        <Footer loadMoreFeeds={this.loadMoreFeeds} hideButton={isLoading} />
      </>
    );
  }
}

export default App;
