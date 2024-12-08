import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlus,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="netflix-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`base-card ${isHovered ? "hovered" : ""}`}>
        <Card.Img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </Card>

      {isHovered && (
        <Card className="hover-card">
          <div className="position-relative">
            <Card.Img
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              className="hover-image"
            />
            <div className="gradient-overlay" />
          </div>

          <Card.Body className="hover-content">
            <div className="button-group">
              <Button className="action-button play-button">
                <FontAwesomeIcon icon={faPlay} />
              </Button>
              <Button className="action-button">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button className="action-button">
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <Button className="action-button ms-auto">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </div>

            <Card.Title className="movie-title">{movie.title}</Card.Title>

            <div className="movie-meta">
              <span className="meta-item match">
                {Math.round(movie.vote_average * 10)}% 일치
              </span>
              {movie.release_date && (
                <span className="meta-item">
                  {movie.release_date.slice(0, 4)}
                </span>
              )}
              <span className="meta-item">{movie.adult ? "청불" : "15+"}</span>
              <span className="meta-item">HD</span>
            </div>

            <Card.Text className="movie-overview">{movie.overview}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MovieCard;
