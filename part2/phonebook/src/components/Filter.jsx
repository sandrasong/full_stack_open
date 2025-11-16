const Filter = ({nameFilter, setNameFilter}) => (
  <p>filter shown with<input value={nameFilter} onChange={e => setNameFilter(e.target.value)} /></p>
)

export default Filter