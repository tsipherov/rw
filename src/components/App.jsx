import React from "react";
import "../App.css";
import Navbar from "./Navbar/Navbar";
import Filter from "./Filter/Filter";
import Pagination from "./Pagination/Pagination";
import WillWatchCard from "./WillWatchCard/WillWatchCard";
import MovieList from "./MovieList/MovieList";

class App extends React.Component {
  // constructor() {
  //   super();

  state = {
    movies: [],
    watchList: [],
    filters: {
      sort_by: "popularity.desc",
    },
    page: 1,
  };
  // }

  // componentDidMount() {
  //   this.getMovies();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.sort_by !== this.state.sort_by) this.getMovies();
  //   if (prevState.page !== this.state.page) this.getMovies();
  // }

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
      filters: { sort_by: value },
    }));
  };

  render() {
    const {
      page,
      filters: { sort_by },
    } = this.state;
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
              sort_by={this.state.filters.sort_by}
              handler={this.handlerSortTabs}
            />
          </div>
          <div className="d-flex filmsList col-8 mb-5">
            <MovieList sort_by={sort_by} page={page} />
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
