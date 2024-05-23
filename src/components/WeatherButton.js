import React from "react";

const WeatherButton = ({ koreaCities, globalCities, setCity,getCurrentLocation }) => {
  return (
    <div className="citybtn-container-group">
      <div className="citybtn-container">
        <h3>국내 날씨</h3>
        <button className="btn" onClick={getCurrentLocation}>Current Location</button>
        {koreaCities.map((item) => (
          <button className="btn" onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>
      <div className="citybtn-container">
        <h3>해외 날씨</h3>
        {globalCities.map((item) => (
          <button className="btn" onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
