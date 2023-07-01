import React, { useState, useEffect } from "react";

import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState("title");
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    searchMovies("Shrek");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const sortAndFilterMovies = (movies) => {
    let filteredMovies = [...movies];

    if (filterOption !== "all") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.Type === filterOption
      );
    }

    filteredMovies.sort((a, b) => {
      if (sortOption === "title") {
        return a.Title.localeCompare(b.Title);
      } else if (sortOption === "year") {
        return parseInt(a.Year, 10) - parseInt(b.Year, 10);
      }
      return 0;
    });

    return filteredMovies;
  };

  return (
    <div className="app">
      <h1>FilmFinder</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className="sorting-filtering-controls">
        <div className="sorting-controls">
          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="filtering-controls">
          <label>Filter by type:</label>
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {sortAndFilterMovies(movies).map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
