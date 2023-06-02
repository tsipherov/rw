import React from "react";

const SortTabs = ({ sort_by, handler}) => {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <div className={`nav-link ${sort_by === 'popularity.desc' ? 'active' : ""}`} onClick={() => {
            handler("popularity.desc")
        }}>
          Popularity
        </div>
      </li>
      <li className="nav-item">
        <div className={`nav-link ${sort_by === 'revenue.desc' ? 'active' : ""}`} onClick={() => {
            handler("revenue.desc")
        }}>
          Revenue
        </div>
      </li>
      <li className="nav-item">
        <div className={`nav-link ${sort_by === 'vote_average.desc' ? 'active' : ""}`} onClick={() => {
            handler("vote_average.desc")
        }}>
            Vote average
        </div>
      </li>
    </ul>
  );
};

export default SortTabs;
