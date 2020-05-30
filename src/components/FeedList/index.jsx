import React from "react";
import "./style.css";
import { getDomainName, getRelativeTime } from "../../utils";

const FeedList = ({ feeds, showLoader, hideFeed, upvote }) => {
  return (
    <div className="feed-list">
      {!showLoader &&
        feeds.map((feed) => (
          <div className="feed" key={feed.objectID}>
            <div>
              <span className="comments">{feed.num_comments}</span>
              <span className="points">{feed.points}</span>
              <span
                className="upvote"
                data-id={feed.objectID}
                data-votes={feed.points}
                onClick={upvote}
              >
                ▲
              </span>
            </div>
            <div className="title-container">
              <span className="title bold">
                <a href={feed.url}>{feed.title}</a>
              </span>
              <span className="domain">
                &nbsp;({getDomainName(feed.url)})&nbsp;
              </span>
            </div>
            <div>
              <span>by</span>
              <span className="author bold left-pad">{feed.author}</span>
              <span className="time left-pad">
                {getRelativeTime(feed.created_at_i)}
              </span>
              <span className="hide left-pad">
                [
                <a
                  href="/"
                  data-feedid={feed.objectID}
                  onClick={(e) => {
                    e.preventDefault();
                    hideFeed(e.target.dataset.feedid);
                  }}
                >
                  hide
                </a>
                ]
              </span>
            </div>
          </div>
        ))}
      {showLoader && (
        <div className="loader">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default FeedList;
