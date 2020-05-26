import React from "react";
import "./FeedList.css";
import { getDomainName, getRelativeTime } from "../../utils/utility";

const FeedList = ({ feeds }) => {
  return (
    <div className="feed-list">
      {feeds.map((feed) => (
        <div className="feed" key={feed.objectID}>
          <div>
            <span className="comments">{feed.num_comments}</span>
            <span className="points"> {feed.points}</span>
            <span className="upvote">▲</span>
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
              [<a href={feed.objectID}>hide</a>]
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedList;
