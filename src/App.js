// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [apidata, setApidata] = useState({
    description: "",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    pressure: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
    speed: 0,
  });

  const onClickHandler = (event) => {
    console.log(event.target.value);
    console.log("button clicked");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a19decc7fbc1dbe14736e5ea2808203`
      )
      .then((response) => {
        console.log(response.data);
        setApidata({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          country: response.data.sys.country,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          speed: response.data.wind.speed,
        });
      });
  };

  const onChangeHandler = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
    console.log("city", city);
  };

  return (
    <div className="container bg-secondary my-5 p-5 rounded-3 col-6 ">
      <h1 className="glow mx-5">Know weather !! </h1>

      <div className="container my-4 text-center ">
        <div className="row d-flex justify-content-around mx-3">
          <div className="col">
            {" "}
            <input
              type="text"
              className="form-control fst-italic fw-bold "
              placeholder="Enter City here .."
              aria-label="search_box"
              aria-describedby="basic-addon1"
              onChange={onChangeHandler}
              value={city}
            />
          </div>
          <div className="col">
            <button
              className=" btn btn-primary  fst-italic fw-bold mx-5"
              onClick={onClickHandler}
              type="submit"
            >
              Search
            </button>
          </div>
        </div> 
        
        { apidata.temp  && <>
          
          <table className="table table-primary container opacity-25  border-3 my-5 p-5 mx-1 fst-italic fw-bold glow  ">
          
          <tbody>
            <tr>
              <th  scope="row ">Temperature</th>
              <td className="glow1" >{(apidata.temp-273).toFixed(2)} C</td>
            </tr>
            <tr>
              <th scope="row">Description </th>
              <td className="glow1"> {apidata.description.toUpperCase()}</td>
            </tr>
            <tr>
              <th scope="row ">Country</th>
              <td className="glow1"> {apidata.country}</td>
            </tr>
            <tr>
              <th scope="row">Humidity </th>
              <td className="glow1">{apidata.humidity} %</td>
            </tr>
            <tr>
              <th scope="row ">Pressure</th>
              <td className="glow1">{apidata.pressure * 0.000987} atms</td>
            </tr>
            <tr>
              <th scope="row">Wind Speed </th>
              <td className="glow1">{((apidata.speed) * (5/18)).toFixed(3)} kmph</td>
            </tr>
            <tr>
            <th scope="row">Sunrise </th>
            <td className="glow1">{apidata.sunrise} UTC</td>
          </tr>
          <tr>
          <th scope="row">Sunset </th>
          <td className="glow1">{apidata.sunset} UTC</td>
        </tr>
          </tbody>
        </table>
          
          
          </>}

   
      </div>
    </div>
  );
}

export default App;
