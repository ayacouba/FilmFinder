import React, { useState } from "react";
import Modal from "react-modal";
import "../App.css";

Modal.setAppElement("#root");

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://www.omdbapi.com?apikey=${
        import.meta.env.VITE_REACT_APP_OMDB_API_KEY
      }&i=${imdbID}`
    );

    const data = await response.json();
    setMovieDetails(data);
    setModalIsOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalIsOpen(false);
  };

  return (
    <div className="movie" key={imdbID} onClick={fetchMovieDetails}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>

        <h2>{movieDetails.Title}</h2>
        <p>Runtime: {movieDetails.Runtime}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Actors: {movieDetails.Actors}</p>
        <p>Plot: {movieDetails.Plot}</p>

        <div className="third-party-services">
          <a
            href={`https://www.imdb.com/title/${imdbID}`}
            target="_blank"
            rel="noreferrer"
          >
            View on IMDb
          </a>
          <a
            href={`https://www.rottentomatoes.com/search?search=${Title}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Rotten Tomatoes
          </a>
          <a
            href={`https://www.metacritic.com/search/movie/${Title}/results`}
            target="_blank"
            rel="noreferrer"
          >
            View on Metacritic
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;
