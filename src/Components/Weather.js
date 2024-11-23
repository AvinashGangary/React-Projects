import React, { useState } from "react";
import cloud from "../images/Clouds.png";
import clear from "../images/Clear.png";
import rain from "../images/Rain.png";
import err from "../images/error.png";
import mist from "../images/mist.png";
import smoke from "../images/smoke.png"; // Import the smoke image
import '@fortawesome/fontawesome-free/css/all.min.css';

const Weather = () => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const API_KEY = "d89e5b39db8d03c24d5405f0879d35e2";

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    if (search === "") {
      alert("Please Enter City Name");
      setError("Please Enter City Name");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );
      const jsonData = await response.json();
      setData(jsonData);
      if (jsonData.cod === "404") {
        setError("Invalid name, City Not Found");
      } else {
        setError("");
      }
    } catch (err) {
      setError("Error fetching data");
    }
    setSearch("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
    inputs: {
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      marginLeft: "10px",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    errorPage: {
      color: "red",
      textAlign: "center",
    },
    weathers: {
      textAlign: "center",
    },
    temperature: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    climate: {
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputs}>
        <input
          style={styles.input}
          placeholder="Search City"
          value={search}
          onChange={handleInput}
        />
        <button style={styles.button} onClick={myFun}>
          <i className="fa-solid fa-magnifying-glass" style={{ marginRight: "5px" }}></i>
          Search
        </button>
      </div>
      <div className="data">
        {error ? (
          <div style={styles.errorPage}>
            <h2>Oops</h2>
            <p>{error}</p>
            <img src={err} alt="Error" />
          </div>
        ) : null}
        {data && data.weather ? (
          <div style={styles.weathers}>
            <h2 className="cityName">{data.name}</h2>
            {data.weather[0].main === "Clouds" && <img src={cloud} alt="Cloudy" />}
            {data.weather[0].main === "Clear" && <img src={clear} alt="Clear" />}
            {data.weather[0].main === "Rain" && <img src={rain} alt="Rainy" />}
            {data.weather[0].main === "Mist" && <img src={mist} alt="Misty" />}
            {data.weather[0].main === "Smoke" && <img src={smoke} alt="Smoky" />} {/* Added condition */}
            <h2 style={styles.temperature}>{Math.trunc(data.main.temp)}°C</h2>
            <p style={styles.climate}>{data.weather[0].description}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;
