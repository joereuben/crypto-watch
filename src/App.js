import {useState} from 'react'
import Crypto from './Crypto'
import Assets from './Assets'
// https://docs.coinapi.io
const endPoint = "https://rest.coinapi.io/"
const API_KEY = "7FD1289F-D8FF-424D-BF6B-86B925CBEB98"
let allAssets = [];

function App() {
  const [assets, setAssets] = useState([])
  const [search, setSearch] = useState("")

  const loadCrypto = async () => {
    try {
      let url = endPoint + "v1/assets/?apikey="+API_KEY
      let response = await fetch(url)
      allAssets = await response.json()
      setTopAssets()
      // allAssets = response
      console.log(allAssets.length)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    if(!search){
      setTopAssets()
      return
    }
    // console.log("change: "+search)
    searchAssets()
  }

  const searchAssets = () => {
    if(allAssets.length === 0) return
    let searchResults = assets.filter( asset => {
      // console.log(asset.name)
      let i = asset.name.indexOf(search)
      if(i < 0) i = asset.asset_id.indexOf(search)
      return i > 0
    })
    setAssets(searchResults)
  }

  const setTopAssets = () => {
    if(allAssets.length === 0) return

    let arr = []
    for (let index = 0; index < 20; index++) {// just 20 for now
      arr.push(allAssets[index])
    }
    setAssets(arr)
  }

  return (
    <div className="container">
      <h1>Cypto Watch</h1>
      <button onClick={loadCrypto}>Fetch</button>
      <form action="" onSubmit={handleSubmit}>
        <input type="search" placeholder='Search. BTC or Bitcoin' value={search} onChange={handleChange}/>
      </form> 
      <div className="display">

        {/* <div className="box">
          <span>Coin</span>
          <span>Price</span>
          <span>Daily Change</span>
          <span>Market Cap</span>
        </div> */}
        {/* {assets.map( asset => {
          return <Crypto asset={asset}/>
        })} */}
        <Assets assets={assets}/>
      </div>
     
    </div>
  );
}

export default App;
