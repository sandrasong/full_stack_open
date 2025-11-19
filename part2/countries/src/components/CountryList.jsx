const CountryList = ({ displayList, setDisplayList }) => (
  <ul>
    {displayList.map(country => 
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => setDisplayList([country])}>show</button>
      </li>)}
  </ul>
)

export default CountryList