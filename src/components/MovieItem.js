import React from 'react'

function Image(props) {
    let { data } = props;
    return (<img
      className="card-img-top"
      src={`https://image.tmdb.org/t/p/w500${data.poster_path || data.backdrop_path}`}
      alt={data.original_title}
    />
    )
  }
  
  class MovieItem extends React.Component {
  
    constructor(props) {
      super(props)
  
      this.state = {
        movie: this.props.data,
        showOverview: false,
        like: false
      }
    }
  
    toggleOverview = () => {
      this.setState(
        {
          showOverview: !this.state.showOverview
        }
      )
    }
  
    handleLike = () => {
      this.setState({
        like: !this.state.like
      })
    }
  
    render() {
      let { title, vote_average, overview, ...data } = this.state.movie;
  
      return (
        <div className="card">
          <Image data={data} />
          <div className="card-body">
            <h5 className='card-title'>Title: {title}</h5>
            <p className='card-text'>Rating: {vote_average}</p>
            {this.state.showOverview ? <p className='card-text'>{overview}</p> : null}
            <div className="d-flex justify-content-between">
              <button
                type='button'
                className="btn btn-secondary"
                onClick={this.toggleOverview}
              >
                {this.state.showOverview ? "Hide overview" : "Show overview"}
              </button>
              <button
                type="button"
                onClick={this.handleLike}
                className={this.state.like ? "btn btn-primary" : "btn btn-secondary"}
              >
                Like
          </button>
              <button
                type="button"
                onClick={this.props.handle.bind(this, this.state.movie.id)}
                className="btn btn-danger"
              >
                Delete
          </button>
            </div>
          </div>
        </div>
      )
    }
  }

  export default MovieItem