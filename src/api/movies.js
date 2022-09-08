import axios from "axios";


const baseUrl = "http://www.omdbapi.com/";
const apiKey = "bfe0b26a";


function searchMovie(searchPhrase, page = 1) {
  return axios.get(`${baseUrl}?apiKey=${apiKey}&s=${searchPhrase}&page=${page}`)
}


function getSingleMovie(movieId) {
  return axios.get(`${baseUrl}?apiKey=${apiKey}&i=${movieId}`)
}

export { searchMovie, getSingleMovie };