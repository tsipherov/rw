import React from "react";

const Filter = ({ sort_by, handler }) => {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      value={sort_by}
      onChange={(e) => handler(e.target.value)}
    >
      <option value="popularity.desc">Popularity</option>
      <option value="revenue.desc">Revenue</option>
      <option value="vote_average.desc">Vote average</option>
    </select>
  );
};

export default Filter;
