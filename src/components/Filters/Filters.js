import React, { useEffect, useState } from "react";
import Select from "../UI/Select/Select";
import { useFetch } from "../../hooks/useFetch";

const Filters = ({ filtersHandler }) => {
  const [genreList, setGenreList] = useState([]);

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();

  useEffect(() => {
    if (!isLoading && !response && !error) createFetchRequest("getGenre");

    if (!isLoading && !error && response) {
      setGenreList(response.genres);
    }
  }, [isLoading, response, error]);

  const sortByFilters = [
    { id: "popularity.desc", name: "Popularity" },
    { id: "revenue.desc", name: "Revenue" },
    { id: "vote_average.desc", name: "Vote average" },
  ];

  const createYearSelect = (years) => {
    const yearsArr = new Array(years);
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < years; i++) {
      yearsArr[i] = { id: currentYear - i, name: currentYear - i };
    }
    return yearsArr;
  };

  return (
    <div className="d-flex flex-column col-2 border">
      <h5 className="pt-4">Sort Results By</h5>
      <Select
        data={sortByFilters}
        handler={(value) => {
          filtersHandler("sort_by", value);
        }}
      />

      <h5 className="pt-4">Genres</h5>
      <Select
        data={genreList}
        handler={(value) => {
          filtersHandler("with_genres", value);
        }}
        defaultOption={{ id: "all", name: "All genres" }}
      />

      <h5 className="pt-4">Release year</h5>
      <Select
        data={createYearSelect(75)}
        handler={(value) => {
          filtersHandler("primary_release_year", value);
        }}
        defaultOption={{ id: "all", name: "All years" }}
      />
    </div>
  );
};

export default Filters;
