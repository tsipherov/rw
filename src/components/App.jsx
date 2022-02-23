import React from "react";
import { API_URL, API_KEY_3 } from "../api";
import MovieItem from "./MovieItem";
// import SortTabs from "./SortTabs";
import "../App.css";
import Navbar from "./Navbar/Navbar";
import Filter from "./Filter/Filter";
import Pagination from "./Pagination/Pagination";
import WillWatchCard from "./WillWatchCard/WillWatchCard";

class App extends React.Component {
  // constructor() {
  //   super();

  state = {
    movies: [],
    watchList: [],
    sort_by: "popularity.desc",
    page: 1,
  };
  // }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) this.getMovies();
    if (prevState.page !== this.state.page) this.getMovies();
  }

  getMovies() {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&language=uk-UA&page=${this.state.page}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: data.results });
      });
  }

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
    this.setState((prevState) => {
      return { sort_by: value, page: 1 };
    });
  };

  render() {
    const movieList = this.state.movies.map((movie) => {
      return (
        <div className="align-self-stretch" key={movie.id}>
          <MovieItem
            data={movie}
            handle={this.handleDelete}
            handlerWillWatch={this.handlerWillWatchAdd}
            handlerRemoveWillWatch={this.handlerWillWatchRemove}
          />
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <Navbar />
        {/* <div className="row my-3">
          <SortTabs
            sort_by={this.state.sort_by}
            handler={this.handlerSortTabs}
          />
        </div> */}
        <div className="row my-3">
          <div className="d-flex flex-column col-2">
            <h3>Sort Results By</h3>
            <Filter
              sort_by={this.state.sort_by}
              handler={this.handlerSortTabs}
            />
          </div>
          <div className="d-flex filmsList col-8 mb-5">
            {movieList}
            <div className="d-flex row w-100 py-5">
              <Pagination
                handler={this.handlerPagination}
                currentPage={this.state.page}
              />
            </div>
          </div>
          <div className="d-flex flex-column col-2">
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
