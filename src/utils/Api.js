import { API_KEY } from '../config.json';

import moment from 'moment';

const ROOT_URL = 'https://api.themoviedb.org/3';
const ROOT_IMAGE_URL = 'https://image.tmdb.org/t/p/w300/';

class Api {

  // static methods to clean your API.
  // I want to transform the `poster_path` key by an `img`
  // key that has the full URL of the image
  static cleanMovie(data) {
    const {
      title,
      vote_average,
      id,
      genres,
      poster_path
    } = data;
    return {
      img: poster_path === null ? undefined : ROOT_IMAGE_URL + poster_path,
      title,
      vote_average,
      id,
      genres: genres.map(g => g.name)
    }
  }

  // static methods to clean your API.
  // I want to transform the `overview` key by `description`
  static cleanMovieList(data) {
    return data.results.map((datum) => {
      // console.log('datum', datum);
      const {
        title,
        vote_average,
        id,
        genre_ids,
        poster_path,
        overview
      } = datum;
      return {
        img: poster_path === null ? undefined : ROOT_IMAGE_URL + poster_path,
        title,
        id,
        genres: genre_ids,
        description: overview
      }
    });
  }

  getMovie(id) {
    const url = ROOT_URL + `/movie/${id}?api_key=${API_KEY}`;
    console.log('Api#getMovie url', url);
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Api#getMovie data', data);
        return Api.cleanMovie(data);
      });
  }

  getLatestMovies() {
    const today = moment().format('YYYY-MM-DD');
    const nextWeek = moment().add(7, 'day').format('YYYY-MM-DD');
    console.log();
    const url = ROOT_URL + `/discover/movie?primary_release_date.gte=${today}&primary_release_date.lte=${nextWeek}&api_key=${API_KEY}`;
    console.log('Api#getLatestMovies url', url);
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Api#getLatestMovies data', data);
        return Api.cleanMovieList(data);
      });

  }

  getPopularMovies() {
    const url = ROOT_URL + `/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
    console.log('Api#getPopularMovies url', url);
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Api#getLatestMovies data', data);
        return Api.cleanMovieList(data);
      });

  }
}

export default new Api();