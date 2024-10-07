import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className='box-container'>
        {/* 지역이름 */}
        <h1>{weather?.name}</h1>
        {/* 온도 */}
        <h2>{weather?.main.temp}℃ / {weather?.main.temp * 1.8 + 32}℉</h2>
        {/* 날씨 상태 */}
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox