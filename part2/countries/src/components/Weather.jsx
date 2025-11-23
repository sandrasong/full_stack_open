import { useEffect, useState } from 'react'
import weatherService from '../services/countries'

const Weather = ({capital, lat, lon}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      try {
        const weatherData = await weatherService.getWeather(lat, lon)
        console.log(weatherData)
        setWeather(weatherData)
      } catch (e) {
        console.log("fetch weather failed", e);      
      }
    }
    getWeather()
  }, [capital])

  return (
  <>
    <h2>Weather in {capital}</h2>
    {weather && 
      <div>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed}</p>
      </div>
    }
  </>
)}

export default Weather