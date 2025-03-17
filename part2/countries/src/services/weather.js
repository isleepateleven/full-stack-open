import axios from 'axios'

// Get API key from .env file
const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lng) => {
    // https://openweathermap.org/current
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
    return request.then((response) => response.data)
}

export default { getWeather }
