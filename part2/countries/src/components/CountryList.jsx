const CountryList = ({ displayList }) => (
  <ul>
    {displayList.map(country => <li key={country.name.common}>{country.name.common}</li>)}
  </ul>
)

export default CountryList