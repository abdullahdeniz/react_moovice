import React from 'react';
import Api from '../utils/Api';
import Card from './movie/Card';
import _ from 'lodash';

class Popular extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            currentPage: 1
        };

        this.onClickCard = this.onClickCard.bind(this);
    }

    saveToLocalStorage(movieId) {
        console.log('PopularBattle#saveToLocalStorage movieId', movieId);
        const localListStr = localStorage.getItem('my-list') || '[]';
        const localList = JSON.parse(localListStr);
        if (localList.includes(movieId) === false) {
            localList.push(movieId);
            localStorage.setItem('my-list', JSON.stringify(localList));
        }
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
        this.saveToLocalStorage(movieId);
        this.setState({
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
                    <h1>Popular Battle</h1>
                </div>
                <div className="col-6">
                    <Card {...movie1} onClick={() => this.onClickCard(movie1.id)} />
                </div>
                <div className="col-6">
                    <Card {...movie2} onClick={() => this.onClickCard(movie2.id)} />
                </div>
            </div>
        );
    }
}

export default Popular;