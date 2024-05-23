// 유저는 현재위치의 날씨를 볼 수 있다.(지역,온도,날씨 상태) - 완료
// 유저는 다른 도시의 버튼들을 볼 수 있다. - 완료
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다. - 완료
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다.

import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { ClockLoader } from "react-spinners";

function App() {
  const koreaCities = ["Incheon", "Seoul", "Busan"];
  const globalCities = ["Paris", "New York", "London", "Osaka"];
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [visible, setVisible] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=007e29a2b22670088771468eefd480ee`;
    setVisible(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setVisible(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=007e29a2b22670088771468eefd480ee&units=metric`;
    setVisible(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setVisible(false);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <>
      {visible ? (
        <div className="container">
          <ClockLoader
            height="100"
            width="100"
            color="skyblue"
            visible={true}
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            koreaCities={koreaCities}
            globalCities={globalCities}
            setCity={setCity}
            getCurrentLocation={getCurrentLocation}
          />
        </div>
      )}
    </>
  );
}

export default App;
