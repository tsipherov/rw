import React from "react";
import "../App.css";
// import { moviesData } from "../moviesData"
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3} from '../api'
import SortTabs from "./SortTabs";

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      movies: [],
      watchList: [],
      sort_by: "vote_average.desc" 
    }
  }

  componentDidMount() { 
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`).then((response) => response.json()).then(data => { this.setState({ movies: data.results } )})
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
  handlerWillWatchAdd = (movie) => { 

    this.setState((prevState) => {
      let newWatchList = [...prevState.watchList, movie]
      return {
        watchList: newWatchList
      }
    })
  }
  
  handlerWillWatchRemove = (movie) => { 

    this.setState((prevState) => {
      let newWatchList = prevState.watchList.filter(item =>{ 
        
          return item.id !== movie.id
        
      })
      return {
        watchList: newWatchList
      }
    })
  }

  handlerSortTabs = value => { 
    this.setState(
      (prevState) => {return { sort_by: value } }
    )
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <SortTabs sort_by={this.state.sort_by} handler={ this.handlerSortTabs }/>
        </div>
        <div className="row">
          <ul className="d-flex filmsList col-9">
            { this.state.movies.map((movie) => {
              return (
                <li key={movie.id}>
                  <MovieItem data={movie} handle={this.handleDelete} handlerWillWatch={this.handlerWillWatchAdd}
                    handlerRemoveWillWatch={ this.handlerWillWatchRemove}/>
                </li>
              )
            })}
          </ul>
          <div className="d-flex flex-column col-3">
            <p>Will watch: {this.state.watchList.length}</p>
            <ul className="">
            { this.state.watchList.map((movie) => {
              return (
                <li key={movie.id}>
                  <MovieItem data={movie}/>
                </li>
              )
            })}
          </ul>
          </div>
       </div>
      </div>
    )
  }
}

export default App;
