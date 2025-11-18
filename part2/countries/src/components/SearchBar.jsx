const SearchBar = ({ search, setSearch }) => (
  <>
    <span>find countries: </span><input value={search} onChange={(e) => setSearch(e.target.value)} />
  </>
)

export default SearchBar