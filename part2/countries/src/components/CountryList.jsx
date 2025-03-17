import { useState, useEffect} from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({ countries, filter }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        setSelectedCountry(null) // Reset selected country when the filter changes
    }, [filter])
    
    if (!filter){
        return null
    }

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    const handleShowClick = (country) => setSelectedCountry(country)

    return (
        <div>
            {countries.map(country =>
                <div key={country.cca3}> 
                    {country.name.common} <button onClick={() => handleShowClick(country)}>Show</button>
                </div>
            )}

            {selectedCountry && <CountryDetails country={selectedCountry} />}
        </div>
    )
}

export default CountryList