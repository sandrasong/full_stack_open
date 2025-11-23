import Weather from "./Weather"

const Country = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {/* display languages here, languages is an object*/}
      {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
    <Weather capital={country.capital[0]} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
  </div>
)

export default Country