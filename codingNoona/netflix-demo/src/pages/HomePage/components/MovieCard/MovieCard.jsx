import React, { useState } from "react";
import { Button } from "react-bootstrap";
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
      <div className={`netflix-card ${isHovered ? "hovered" : ""}`}>
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        {isHovered && (
          <div className="hover-info">
            <div className="preview-buttons">
              <Button variant="light" className="play-circle">
                <FontAwesomeIcon icon={faPlay} />
              </Button>
              <Button variant="outline-light" className="round-button">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button variant="outline-light" className="round-button">
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <Button variant="outline-light" className="round-button ms-auto">
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </div>
            <div className="preview-details">
              <div className="age-rating">15</div>
              <div className="duration">1시간 34분</div>
              <div className="quality">HD</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
