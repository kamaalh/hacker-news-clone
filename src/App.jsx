import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import FeedList from "./components/FeedList";
import Footer from "./components/Footer";

const LS = window.localStorage;
const maintainLS = true;
class App extends Component {
  state = { feeds: [], page: 0, isLoading: false };
  baseUrl = `https://hn.algolia.com/api/v1/search?`;

  componentDidMount() {
    if (maintainLS) {
      this.initFeedStorage();
    }
    this.loadFrontPageFeeds();
  }

  initFeedStorage = () => {
    if (!LS.getItem("hiddenFeeds")) {
      LS.setItem("hiddenFeeds", JSON.stringify([]));
    }
    if (!LS.getItem("updatedVotes")) {
      LS.setItem("updatedVotes", JSON.stringify([]));
    }
  };

  loadFrontPageFeeds = () => {
    this.fetchFeeds(`${this.baseUrl}tags=front_page`);
  };

  loadMoreFeeds = () => {
    const { page } = this.state,
      nextPage = page + 1;
    this.fetchFeeds(`${this.baseUrl}page=${nextPage}&hitsPerPage=20`);
  };

  fetchFeeds = (url) => {
    this.setState({ isLoading: true });
    fetch(url)
      .then((res) => res.json())
      .then(({ hits, page }) => {
        this.setState({
          feeds: this.getUpdatedFeedsFromLocalStorage(hits, page),
          page,
          isLoading: false,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  upvote = (e) => {
    const votes = parseInt(e.target.dataset.votes);
    const id = e.target.dataset.id;
    this.vote(id, votes);
  };

  // voting service
  vote = (id, votes) => {
    if (maintainLS) {
      // update votes in localStorage as we are not implementing this API currently
      const { feeds, page: curPage } = this.state;
      const updatedVotes = JSON.parse(LS.getItem("updatedVotes"));
      const curPageUpdatedVotes = updatedVotes[curPage] || {};
      curPageUpdatedVotes[id] = votes + 1;
      updatedVotes[curPage] = curPageUpdatedVotes;
      LS.setItem("updatedVotes", JSON.stringify(updatedVotes));

      const feedsWithUpdatedVotes = this.updateVotesFromLocalStorage(
        feeds,
        curPageUpdatedVotes
      );
      this.setState({ feeds: feedsWithUpdatedVotes });
    } else {
      const data = { id, votes };
      fetch("url/to/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  updateVotesFromLocalStorage = (feeds, idWithVotes) => {
    for (let key of Object.keys(idWithVotes)) {
      const curFeed = feeds.find((feed) => feed.objectID === key);
      curFeed && (curFeed.points = idWithVotes[key]);
    }
    return feeds;
  };

  getUpdatedFeedsFromLocalStorage = (feeds, page) => {
    const filteredFeeds = this.filterFeeds(
      feeds,
      this.getCurrentPageHiddenFeeds(page)
    );
    const feedsWithUpdatedVotes = this.updateVotesFromLocalStorage(
      filteredFeeds,
      this.getCurPageUpdatedVotes(page)
    );
    return feedsWithUpdatedVotes;
  };

  getCurrentPageHiddenFeeds = (page) => {
    const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
    return hiddenFeeds[page] || [];
  };

  getCurPageUpdatedVotes = (page) => {
    const updatedVotes = JSON.parse(LS.getItem("updatedVotes"));
    return updatedVotes[page] || [];
  };

  filterFeeds = (feeds, curPageHiddenFeeds) => {
    const filteredFeeds = feeds.filter((feed) => {
      return !curPageHiddenFeeds.includes(feed.objectID);
    });
    return filteredFeeds;
  };

  hideFeed = (feedId) => {
    const { feeds, page } = this.state;
    const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
    const curPageHiddenFeeds = hiddenFeeds[page] || [];
    curPageHiddenFeeds.push(feedId);
    hiddenFeeds[page] = curPageHiddenFeeds;
    LS.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    const filteredFeeds = this.filterFeeds(feeds, curPageHiddenFeeds);
    this.setState({ feeds: filteredFeeds });
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
