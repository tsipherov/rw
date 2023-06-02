import React from "react";
import "./MovieItem.css";

function Image(props) {
  let { data } = props;
  return (
    <img
      className="card-img-top"
      src={`https://image.tmdb.org/t/p/w500${
        data.poster_path || data.backdrop_path
      }`}
      alt={data.original_title}
    />
  );
}

class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.data,
      showOverview: false,
      like: false,
      willWatch: false,
    };
  }

  toggleOverview = () => {
    this.setState({
      showOverview: !this.state.showOverview,
    });
  };

  handleLike = () => {
    this.setState({
      like: !this.state.like,
    });
  };

  render() {
    let { title, vote_average, overview, release_date, ...data } =
      this.state.movie;

    return (
      <div className="card">
        <Image data={data} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="d-flex justify-content-between">
            <div>
              <p className="card-text">Rating: {vote_average}</p>
              <p className="card-text">{release_date}</p>
            </div>
            {this.props.handlerWillWatch ? (
              <button
                type="button"
                onClick={() => {
                  if (!this.state.willWatch) {
                    this.props.handlerWillWatch(this.state.movie);
                  } else {
                    this.props.handlerRemoveWillWatch(this.state.movie);
                  }
                  this.setState((prevState) => {
                    return {
                      willWatch: !prevState.willWatch,
                    };
                  });
                }}
                className={`btn ${
                  this.state.willWatch ? "btn-warning" : "btn-info"
                } btn-sm btn-watch`}
              >
                {this.state.willWatch ? "Not watch" : "Will watch"}
              </button>
            ) : null}
          </div>
          {this.state.showOverview ? (
            <p className="card-text">{overview}</p>
          ) : null}

          {this.props.handle ? (
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={this.toggleOverview}
              >
                {this.state.showOverview ? "Hide overview" : "Show overview"}
              </button>
              <button
                type="button"
                onClick={this.handleLike}
                className={
                  this.state.like
                    ? "btn btn-primary btn-sm"
                    : "btn btn-secondary btn-sm"
                }
              >
                Like
              </button>
              <button
                type="button"
                onClick={() => {
                  this.props.handle(this.state.movie.id);
                }}
                // onClick={this.props.handle.bind(this, this.state.movie.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MovieItem;
