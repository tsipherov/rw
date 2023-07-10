import React from "react";
// import Navbar from "./Navbar/Navbar";
// import Pagination from "./Pagination/Pagination";
// import WillWatchCard from "./WillWatchCard/WillWatchCard";
// import MoviesContainer from "./MovieList/MoviesContainer";
// import Filters from "./Filters/Filters";
// import ApiService from "../services/apiService";
import MoviesContainer from "../../components/MovieList/MoviesContainer";
import "./HomePage.css";
import ApiService from "../../services/apiService";
import Filters from "../../components/Filters/Filters";

const API_KEY_3 = process.env.REACT_APP_API_KEY_3;

class HomePage extends React.Component {
  state = {
    genreList: [],
    watchList: [],
    filters: {
      sort_by: "popularity.desc",
      with_genres: "all",
      primary_release_year: "all",
    },
    page: 1,
  };

  service = new ApiService();

  componentDidMount() {
    this.service
      .getGenre()
      .then((res) => res.json())
      .then((res) => {
        console.log("getGenre >>> ", res);
        this.setState({ genreList: res.genres });
      });
  }

  createYearSelect = (years) => {
    const yearsArr = new Array(years);
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < years; i++) {
      yearsArr[i] = { id: currentYear - i, name: currentYear - i };
    }
    return yearsArr;
  };

  handlerPagination = (page) => {
    this.setState({ page });
    console.log(this.state);
  };

  handleDelete = (id) => {
    const newMovies = this.state.movies.filter((movie) => {
      return movie.id !== id;
    });
    console.log(newMovies);

    this.setState({
      movies: newMovies,
    });
  };
  handlerWillWatchAdd = (movie) => {
    this.setState((prevState) => {
      let newWatchList = [...prevState.watchList, movie];
      return {
        watchList: newWatchList,
      };
    });
  };

  handlerWillWatchRemove = (movie) => {
    this.setState((prevState) => {
      let newWatchList = prevState.watchList.filter((item) => {
        return item.id !== movie.id;
      });
      return {
        watchList: newWatchList,
      };
    });
  };

  handlerSortTabs = (value) => {
    this.setState((state) => ({
      ...state,
      page: 1,
      filters: { ...state.filters, sort_by: value },
    }));
  };

  handlerGenres = (value) => {
    this.setState((state) => ({
      ...state,
      page: 1,
      filters: { ...state.filters, with_genres: value },
    }));
  };

  handlerReleaseYear = (value) => {
    this.setState((state) => ({
      ...state,
      page: 1,
      filters: { ...state.filters, primary_release_year: value },
    }));
  };

  render() {
    const { page } = this.state;
    return (
      <div className="container-xxl">
        <div className="row my-3 px-3">
          <Filters
            genreList={this.state.genreList}
            createYearSelect={this.createYearSelect}
            handlerSortTabs={this.handlerSortTabs}
            handlerGenres={this.handlerGenres}
            handlerReleaseYear={this.handlerReleaseYear}
          />

          <MoviesContainer
            handlerPagination={this.handlerPagination}
            filters={this.state.filters}
            page={page}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;
