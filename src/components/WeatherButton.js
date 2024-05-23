import React from "react";

const WeatherButton = ({ koreaCities, globalCities, setCity }) => {
  return (
    <div>
      <div>
        <div>국내 날씨</div>
        <button className="btn">Current Location</button>
        {koreaCities.map((item) => (
          <button className="btn" onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>
      <div>
        <div>해외 날씨</div>
        {globalCities.map((item) => (
          <button className="btn" onClick={() => setCity(item)}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
