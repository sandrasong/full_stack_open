const Country = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>{country.capital[0]}</p>
    <p>{country.area}</p>
    <h2>Languages</h2>
    <ul>
      {/* display languages here, languages is an object*/}
      {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
  </div>
)

export default Country