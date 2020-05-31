import {
  getUpdatedFeedsFromLocalStorage,
  saveNewVotesInLocalStorage,
  saveHiddenFeedInLocalStorage,
} from "./localStorage";

const maintainLS = true;
const Service = {
  fetchFeeds: (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then(({ hits, page }) => ({
        feeds: getUpdatedFeedsFromLocalStorage(hits, page),
        page,
      }))
      .catch((error) => console.error("Error:", error));
  },

  upvote: (feeds, page, id, votes) => {
    if (maintainLS) {
      // update votes in localStorage as we are not implementing this API currently
      const feedsWithUpdatedVotes = saveNewVotesInLocalStorage(
        feeds,
        page,
        id,
        votes
      );
      return Promise.resolve(feedsWithUpdatedVotes);
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
  },

  hideFeed: (feedId, feeds, page) => {
    const filteredFeeds = saveHiddenFeedInLocalStorage(feedId, feeds, page);
    return Promise.resolve(filteredFeeds);
  },
};

export default Service;
