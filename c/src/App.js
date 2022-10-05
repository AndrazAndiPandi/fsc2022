import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesDisplay = ({country, setFilter})=>{
    return <li>{country.name.common}    <button onClick={()=>setFilter(country.name.common)}>Show</button></li>
}

const GetWeather = ({country}) =>{
  const [vreme,setVreme] = useState()
  const [isLoading, setLoading] = useState(true)
  const capital = country.capital[0]
  let api_key = process.env.REACT_APP_API_KEY
  const APIurl = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`

  const hook = () =>{
    axios.get(APIurl).then(response => {
      setVreme(response.data)
      setLoading(false)
    })
  }

  useEffect(hook,[])

  if(isLoading)
    return <p>Loading weather data...</p>
  else {
    const temperature = Math.round(vreme.main.temp)
    const wind = Math.round(vreme.wind.speed)
    const icon = vreme.weather[0].icon
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
      <div>
        <p><strong>Temperature:</strong> {temperature}°C</p>
        <img src={iconURL} alt=''></img>
        <p><strong>Weather:</strong> {vreme.weather[0].description}</p>
        <p><strong>Wind:</strong> {wind}km/h</p>
      </div>
    )
  }

}

const Filtering = ({countries, filter, setFilter}) =>{

  let founds = countries.filter(f => f.name.common.toLowerCase().includes(filter.toLowerCase()) || filter === '').length
  if(founds <= 10 && founds > 1){
  return (
    countries.filter(f => f.name.common.toLowerCase().includes(filter.toLowerCase()) || filter === '')
    .map(country => <CountriesDisplay country = {country} setFilter={setFilter}/>)
  )} else if(founds === 1){
    let country = countries.filter(f => f.name.common.toLowerCase().includes(filter.toLowerCase()))

    return(
      <div>
        <h1>{country[0].name.common}</h1>
        <p>Capital: {country[0].capital}</p>
        <p>Area: {country[0].area}</p>
        <p><strong>Languages:</strong></p>
        {Object.entries(country[0].languages).map(lang=><li>{lang[1]}</li>)}
        <img src={country[0].flags.png} alt=''></img>
        <h2>Weather in {country[0].capital}</h2>
        <GetWeather country={country[0]}/>
      </div>
    )
  } else {
    return "Too many matches, specify another filter"
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(response=>setCountries(response.data))
  },[])

  return (
    <div>
      <h1>WORLD INFO POINT</h1>
      <div>
        Find countries: <input value={filter} onChange={event=>setFilter(event.target.value)}/>
      </div>
      <ul>
        <Filtering countries={countries} filter={filter} setFilter={setFilter}/>
      </ul>
    </div>
  )
}

export default App
