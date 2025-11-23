import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getOneCountry = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

const getWeather = async(lat, lon) => {
  const response = await axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
  return response.data
}

export default { getAll, getOneCountry, getWeather }