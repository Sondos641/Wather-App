import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "656632acadf6c582b1a664c6be68428a"; 

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      )
      .then((res) => {
        console.log("GEO RESPONSE:", res.data);

        // ❗ check if city exists
        if (!res.data || res.data.length === 0) {
          throw new Error("City not found in geo API");
        }

        return res.data[0];
      })
      .then((geoData) => {
        console.log("GEO DATA:", geoData);

        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${API_KEY}&units=metric`
        );
      })
      .then((res) => {
        console.log("WEATHER DATA:", res.data);
        setWeather(res.data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        alert("City not found");
      });
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Check Weather</button>
      </form>

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}
return(
  <footer className="footer">
  <p>© 2026 Weather App | Built by Sondos Falah</p>
  </footer>
)
export default App;