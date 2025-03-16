import CountryDetails from './CountryDetails'

const CountryList = ({ countries, filter }) => {
    if (!filter){
        return <div></div>
    }
    
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    return (
        <div>
            {countries.map( country =>
                <div key={country.cca3}> {country.name.common} </div>
            )}
        </div>
    )
}

export default CountryList