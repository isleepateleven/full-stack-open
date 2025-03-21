import Weather from './Weather'

const CountryDetails = ({ country }) => {
    return(
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital.join(', ')}</div>
            <div>Area: {country.area}</div>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200"/>

            <Weather 
                capital={country.capital[0]} 
                lat={country.capitalInfo.latlng[0]}
                lng={country.capitalInfo.latlng[1]}
            />
        </div>
    )
}

export default CountryDetails