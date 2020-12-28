import React from 'react';
import Api from '../utils/Api';
import Card from './movie/Card';
import { Link } from 'react-router-dom';

class MyList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movieIds: this.getFromLocalStorage(),
      movies: []
    };
  }

  getFromLocalStorage() {
    const listStr = localStorage.getItem('my-list') || '[]';
    return JSON.parse(listStr);
  }

  componentDidMount() {
    Promise.all(this.state.movieIds.map(movieId => Api.getMovie(movieId)))
      .then((movies) => {
        console.log('movies', movies);
        this.setState({
          movies
        })
      });
  }

  render() {
    console.log('cmp/MyList#render this.props', this.props);
    if (this.state.movieIds.length === 0) {
      return (
        <div>
          No movies added to your list. Go to <Link to="/">This week</Link> to add them
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1>My List</h1>
        </div>
        {this.state.movies.map((movie, index) => {
          return (
            <div key={index} className="col-3">
              <Card  {...movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MyList;