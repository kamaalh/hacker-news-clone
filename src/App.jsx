import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import FeedList from "./components/FeedList";
import Footer from "./components/Footer";
import { initLocalStorage } from "./service/localStorage";
import Service from "./service";

class App extends Component {
  state = { feeds: [], page: 0, isLoading: false };
  baseUrl = `https://hn.algolia.com/api/v1/search?`;

  componentDidMount() {
    initLocalStorage();
    this.loadFrontPageFeeds();
  }

  loadFrontPageFeeds = () => {
    this.setState({ isLoading: true });
    Service.fetchFeeds(`${this.baseUrl}tags=front_page`).then(
      ({ feeds, page }) => {
        this.setState({
          feeds,
          page,
          isLoading: false,
        });
      }
    );
  };

  loadMoreFeeds = () => {
    const { page } = this.state,
      nextPage = page + 1;
    this.setState({ isLoading: true });
    Service.fetchFeeds(`${this.baseUrl}page=${nextPage}&hitsPerPage=20`).then(
      ({ feeds, page }) => {
        this.setState({
          feeds,
          page,
          isLoading: false,
        });
      }
    );
  };

  upvote = (id, votes) => {
    const { feeds, page } = this.state;
    this.setState({ isLoading: true });
    Service.upvote(feeds, page, id, votes).then((feedsWithUpdatedVotes) => {
      this.setState({ feeds: feedsWithUpdatedVotes, isLoading: false });
    });
  };

  hideFeed = (feedId) => {
    const { feeds, page } = this.state;
    this.setState({ isLoading: true });
    Service.hideFeed(feedId, feeds, page).then((filteredFeeds) => {
      this.setState({ feeds: filteredFeeds, isLoading: false });
    });
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
          upvote={this.upvote}
        ></FeedList>
        <Footer loadMoreFeeds={this.loadMoreFeeds} hideButton={isLoading} />
      </>
    );
  }
}

export default App;
