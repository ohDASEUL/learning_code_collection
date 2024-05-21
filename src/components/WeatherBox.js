import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div>
        {/* 지역이름 */}
        <div>{weather?.name}</div>
        {/* 온도 */}
        <h2>{weather?.main.temp}˚F</h2>
        {/* 날씨 상태 */}
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox