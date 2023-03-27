import React from "react";
import "../App.css";
import Navbar from "./Navbar/Navbar";
import Pagination from "./Pagination/Pagination";
// import WillWatchCard from "./WillWatchCard/WillWatchCard";
import MovieList from "./MovieList/MovieList";
import ApiService from "../services/ApiService";
import Filters from "./Filters/Filters";

class App extends React.Component {
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
      .getAuthentication()
      .then((res) => res.json())
      .then((res) => console.log("getAuthentication >>> ", res));
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
    const {
      page,
      filters: { sort_by },
    } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container-xxl">
          <div className="row my-3 px-3">
            <Filters
              genreList={this.state.genreList}
              createYearSelect={this.createYearSelect}
              handlerSortTabs={this.handlerSortTabs}
              handlerGenres={this.handlerGenres}
              handlerReleaseYear={this.handlerReleaseYear}
            />
            <div className="d-flex filmsList col-8 mb-5">
              <MovieList
                filters={this.state.filters}
                sort_by={sort_by}
                page={page}
              />
              <div className="d-flex row w-100 py-5">
                <Pagination
                  handler={this.handlerPagination}
                  currentPage={this.state.page}
                />
              </div>
            </div>
            {/* <div className="d-flex flex-column col-2">
            <p>Will watch: {this.state.watchList.length}</p>
            <div className="d-flex flex-column">
            {this.state.watchList.map((movie) => {
              return (
                <div className="col" key={movie.id}>
                <WillWatchCard data={movie} />
                  </div>
                  );
                })}
                </div>
              </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
