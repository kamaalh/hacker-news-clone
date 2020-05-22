import React from "react";
import "./FeedList.css";

const FeedList = ({ feeds }) => {
  return (
    <div className="feed-list">
      {feeds.map((feed) => (
        <div className="feed">
          <div>
            <span className="comments">{feed.num_comments}</span>
            <span className="points"> {feed.points}</span>
            <span className="upvote">▲</span>
          </div>
          <div className="title-container">
            <span className="title bold">
              <a href={feed.url}>{feed.title}</a>
            </span>
            <span className="domain">&nbsp;(www.abc.com)&nbsp;</span>
          </div>
          <div>
            <span>by</span>
            <span className="author bold left-pad">{feed.author}</span>
            <span className="time left-pad">ago</span>
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
