import React from "react";

const WeatherButton = ({ koreaCities, globalCities }) => {
  return (
    <div>
      <div>
        <div>국내 날씨</div>
        {koreaCities.map((item) => (
          <button className="btn">{item}</button>
        ))}
      </div>
      <div>
        <div>해외 날씨</div>
        {globalCities.map((item) => (
          <button className="btn">{item}</button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButton;
