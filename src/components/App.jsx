import React from "react";
import "../App.css";
import { moviesData } from "../moviesData"
import MovieItem from './MovieItem'

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      movies: moviesData
    }
  }

  handleDelete = (id)=>{
    const newMovies = this.state.movies.filter((movie)=>{
      return movie.id !== id;
    })
    console.log(newMovies)
    
    this.setState({
      movies: newMovies
    })
  }

  render() {
    return (
      <ul className="d-flex filmsList">
        { this.state.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <MovieItem data={movie} handle={this.handleDelete}/>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default App;
