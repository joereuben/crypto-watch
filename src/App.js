import {useState} from 'react'
import Assets from './Assets'
const endPoint = "http://localhost:9000/api" //my node js back-end

function App() {
  const [allAssets, setAllAssets] = useState([])
  const [assets, setAssets] = useState([])
  const [search, setSearch] = useState("")

  const loadCrypto = async () => {
    try {
      let url = endPoint
      let response = await fetch(url, {headers:{'Access-Control-Allow-Origin': '*'}})
      // console.log(response)
      response = await response.json()
      setAllAssets(response.data)
      setAssets(response.data)
     
      // console.log(JSON.stringify(assets[0]))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    let text = e.target.value
    setSearch(text)
    if(!text.trim()){
      console.log("empty")
      setAssets(allAssets)
      return
    }
    // console.log("change: "+search)
    searchAssets()
  }

  const searchAssets = () => {
    if(allAssets.length === 0) return
    var regex = new RegExp(search, "i")
    let searchResults = allAssets.filter( asset => {      
      let i = asset.name.search(regex)
      return i >= 0
    })
    // console.log(searchResults)
    setAssets(searchResults)
  }

  return (
    <div className="container">
      <h1>Cypto Watch</h1>
      <button onClick={loadCrypto}>Fetch</button>
      <form action="" onSubmit={handleSubmit}>
        <input type="search" placeholder='Search. BTC or Bitcoin' value={search} onChange={handleChange}/>
      </form> 
      <div className="display">
        <Assets assets={assets}/>
      </div>
    </div>
  );
}

export default App;
