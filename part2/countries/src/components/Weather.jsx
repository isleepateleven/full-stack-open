import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital, lat, lng }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (lat && lng) {
            weatherService.getWeather(lat, lng).then((data) => {
                setWeather(data)
            })
        }
    }, [lat, lng]) // run when lat or lng changes 

    if (!weather) {
        return null // dont render anything when wearther is still null
    }

    return(
        <div>
            <h2>Weather in {capital}</h2>
            <div>Temperature: {weather.main.temp} Celsius</div>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description}
            />
            <div>Wind: {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather