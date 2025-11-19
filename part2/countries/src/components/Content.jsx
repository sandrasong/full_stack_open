import CountryList from "./CountryList"
import Country from "./Country"

const Content = ({displayList, setDisplayList}) => {
  if (displayList.length > 10) {
    return <p>Too many matches, specify another search term</p>
  } else if (displayList.length > 1) {
    return <CountryList displayList={displayList} setDisplayList={setDisplayList} />
  } else if (displayList.length == 1) {
    return <Country country={displayList[0]} />
  } else {
    return <p>no match, please change search term</p>
  }
}

export default Content