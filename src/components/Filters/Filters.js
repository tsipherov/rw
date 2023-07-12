import React from "react";
import Select from "../UI/Select/Select";

const Filters = ({
  genreList,
  createYearSelect,
  handlerSortTabs,
  handlerGenres,
  handlerReleaseYear,
}) => {
  const sortByFilters = [
    { id: "popularity.desc", name: "Popularity" },
    { id: "revenue.desc", name: "Revenue" },
    { id: "vote_average.desc", name: "Vote average" },
  ];

  return (
    <div className="d-flex flex-column col-2 border">
      <h5 className="pt-4">Sort Results By</h5>
      <Select data={sortByFilters} handler={handlerSortTabs} />

      <h5 className="pt-4">Genres</h5>
      <Select
        data={genreList}
        handler={handlerGenres}
        defaultOption={{ id: "all", name: "All genres" }}
      />

      <h5 className="pt-4">Release year</h5>
      <Select
        data={createYearSelect(100)}
        handler={handlerReleaseYear}
        defaultOption={{ id: "all", name: "All years" }}
      />
    </div>
  );
};

export default Filters;
