import React from 'react';
import Api from '../utils/Api';
import Card from './movie/Card';
import _ from 'lodash';

class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      movies: [],
      currentPage: 1
    };

    this.onClickCard = this.onClickCard.bind(this);
  }

  saveToLocalStorage(selected) {
    // console.log('selected', selected);
    const localListStr = localStorage.getItem('my-list') || '[]';
    const localList = JSON.parse(localListStr);
    localList.push(selected);
    console.log('localList', localList);
    const flattenList = _.flatten(localList);
    const uniqList = _.uniq(flattenList);

    localStorage.setItem('my-list', JSON.stringify(uniqList));
  }

  componentDidMount() {
    Api.getPopularMovies()
      .then(data => {
        console.log('cmp/Popular#cmpDidMount data', data);
        this.setState({
          movies: data
        })
      });
  }

  // on every click to choose a movie we push it
  // and iterate on the current page
  onClickCard(movieId) {
    const newSelected = this.state.selected;
    newSelected.push(movieId);
    this.saveToLocalStorage(newSelected);
    this.setState({
      selected: newSelected,
      currentPage: this.state.currentPage + 1
    });
  }

  render() {
    const {
      movies,
      currentPage
    } = this.state;

    // if no movies are loaded in state,
    // we must be in loading state
    if (movies.length === 0) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    // if the current page is over the number of movies
    if ((currentPage - 1) * 2 >= movies.length) {
      // EASY, will be updated on myList once everything is over
      // this.props.updateList(this.state.selected); 
      return (
        <div>
          All movies have been choosen
        </div>
      );
    }

    console.log('cmp/Discover#render this.state', this.state);
    // choose 2 movies based on the current page state
    const movie1 = movies[(currentPage - 1) * 2];
    const movie2 = movies[(currentPage - 1) * 2 + 1];
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1>Popular</h1>
        </div>
        {movies.map((movie, index) => {
          return (
            <div className="col-6" key={index}>
              <Card {...movie} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Popular;