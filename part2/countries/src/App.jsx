import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import countryService from './services/countries'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
        setCountries(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Filter value={filter} onChange={handleFilterChange}/>
      <CountryList countries={countriesToShow} filter={filter} />
    </>
  )
}

export default App
