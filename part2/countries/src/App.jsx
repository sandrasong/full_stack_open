import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchBar from './components/SearchBar'
import Content from './components/Content'

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
      <Content displayList={displayList} setDisplayList={setDisplayList} />
    </div>
  )
}

export default App