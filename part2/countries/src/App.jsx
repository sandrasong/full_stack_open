import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'
import SearchBar from './components/SearchBar'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [displayList, setDisplayList] = useState([])

  useEffect(() => {
    console.log('fetching county list...')
    const fetchCountries = async () => {
      try {
        const allCoutries = await countriesService.getAll()
        setCountries(allCoutries)
      } catch (error) {
        console.log("fetch country list failed", error)
      }
    }

    fetchCountries()
  }, [])
  
  useEffect(() => {
    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()) || country.name.official.toLowerCase().includes(search.toLowerCase()))
    setDisplayList(countriesToShow)
  }, [search])

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      {displayList.length > 10 ? 
        <p>Too many matches, specify another search term</p>
        : 
        <CountryList displayList={displayList} />}
        {displayList.length === 1 && <Country country={displayList[0]} />}
    </div>
  )
}

export default App