import React, { useEffect } from "react";
import Select from "../UI/Select/Select";
import { updateFilters } from "../../store/slices/filters.slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../../store/slices/genres.slice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const genreList = useSelector((state) => state.genres.entities);

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

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
          dispatch(updateFilters({ filter: "sort_by", value }));
        }}
        selected={filters.sort_by}
      />

      <h5 className="pt-4">Genres</h5>
      <Select
        data={genreList}
        handler={(value) => {
          dispatch(updateFilters({ filter: "with_genres", value }));
        }}
        defaultOption={{ id: "all", name: "All genres" }}
        selected={filters.with_genres}
      />

      <h5 className="pt-4">Release year</h5>
      <Select
        data={createYearSelect(75)}
        handler={(value) => {
          dispatch(updateFilters({ filter: "primary_release_year", value }));
        }}
        defaultOption={{ id: "all", name: "All years" }}
        selected={filters.primary_release_year}
      />
    </div>
  );
};

export default Filters;
