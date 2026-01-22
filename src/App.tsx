import { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState<number | null>(null)
  const [error, setError] = useState('')

  async function getWeather() {
    if (!city) return
    try {
      setError('')
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=2c2535c4f88675d6a2299c459cd51876&units=metric`
      )
      setTemp(response.data.main.temp)
    } catch (err) {
      console.error(err)
      setTemp(null)
      setError('City not found or API error!')
    }
  }

return (
  <div className="weather">
  <h1>🌤️ Weather Dashboard</h1>

  <div className="weather-form">
    <input
      type="text"
      placeholder="Enter city"
      value={city}
      onChange={e => setCity(e.target.value)}
    />
    <button onClick={getWeather}>Get Weather</button>
  </div>

  {error && <p className="error">{error}</p>}
  {temp !== null && !error && (
    <p className="temp">🌡️ {temp} °C</p>
  )}
</div>
  )
} 