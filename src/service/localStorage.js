const LS = window.localStorage;

export const initLocalStorage = () => {
  if (!LS.getItem("hiddenFeeds")) {
    LS.setItem("hiddenFeeds", JSON.stringify([]));
  }
  if (!LS.getItem("updatedVotes")) {
    LS.setItem("updatedVotes", JSON.stringify([]));
  }
};

export const getUpdatedFeedsFromLocalStorage = (feeds, page) => {
  const filteredFeeds = filterFeeds(feeds, getCurrentPageHiddenFeeds(page));
  const feedsWithUpdatedVotes = getFeedsWithNewVotes(
    filteredFeeds,
    getCurPageUpdatedVotes(page)
  );
  return feedsWithUpdatedVotes;
};

export const saveNewVotesInLocalStorage = (feeds, page, id, votes) => {
  const updatedVotes = JSON.parse(LS.getItem("updatedVotes"));
  const curPageUpdatedVotes = updatedVotes[page] || {};
  curPageUpdatedVotes[id] = votes + 1;
  updatedVotes[page] = curPageUpdatedVotes;
  LS.setItem("updatedVotes", JSON.stringify(updatedVotes));
  return getFeedsWithNewVotes(feeds, curPageUpdatedVotes);
};

export const saveHiddenFeedInLocalStorage = (feedId, feeds, page) => {
  const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
  const curPageHiddenFeeds = hiddenFeeds[page] || [];
  curPageHiddenFeeds.push(feedId);
  hiddenFeeds[page] = curPageHiddenFeeds;
  LS.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
  return filterFeeds(feeds, curPageHiddenFeeds);
};

const getCurrentPageHiddenFeeds = (page) => {
  const hiddenFeeds = JSON.parse(LS.getItem("hiddenFeeds"));
  return hiddenFeeds[page] || [];
};

const getCurPageUpdatedVotes = (page) => {
  const updatedVotes = JSON.parse(LS.getItem("updatedVotes"));
  return updatedVotes[page] || [];
};

const getFeedsWithNewVotes = (feeds, idWithVotes) => {
  for (let key of Object.keys(idWithVotes)) {
    const curFeed = feeds.find((feed) => feed.objectID === key);
    curFeed && (curFeed.points = idWithVotes[key]);
  }
  return feeds;
};

const filterFeeds = (feeds, curPageHiddenFeeds) => {
  const filteredFeeds = feeds.filter((feed) => {
    return !curPageHiddenFeeds.includes(feed.objectID);
  });
  return filteredFeeds;
};
