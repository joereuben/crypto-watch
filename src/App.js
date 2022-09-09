import {useState, useEffect, useCallback} from 'react'
import Assets from './Assets'
const endPoint = "https://crypto-watch-api.onrender.com/api" //my node js back-end
const currencyEndPoint = "https://crypto-watch-api.onrender.com/currency/" //my node js back-end

function App() {
  const [allAssets, setAllAssets] = useState([])
  const [assets, setAssets] = useState([])
  const [search, setSearch] = useState("")
  const [assetData, setAssetData] = useState({})
  const [loading, setLoading] = useState(true)

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
      
      setAssets(allAssets)
      return
    }
    
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

  //get assets metadata (particularly logo)
  const loadAssetData =  async () => {
    
    if(allAssets.length === 0 || !allAssets || Object.keys(assetData).length > 0) return

    let ids = ""
    allAssets.map( (asset, key) => {
      if(key === 0) ids += asset.id
      else ids += ","+ asset.id  // create a string of comma seperated IDs to send to api
      return ""
    })

    let url = currencyEndPoint+ids
    try {
      let response = await fetch(url)
      response = await response.json()
      
      setAssetData(response.data)
      setLoading(false)
     
    } catch (error) {
      setLoading(false)
      console.log("error: "+error)
    }
  }

  useEffect(() => { 
    
    loadAssetData()
  }, [allAssets]);

  useEffect(() => {
    loadCrypto()
  }, []);

  return (
    <div className="container">
      <h1>Crypto Watch</h1>
      <h4>Track your Favourite Crypto Coins</h4>
      {/* <button onClick={loadCrypto}>Fetch</button> */}
      <form action="" onSubmit={handleSubmit}>
        <input type="search" placeholder='Search e.g BTC or Bitcoin' value={search} onChange={handleChange}/>
        <div>
          Designed and developed by 
          <a href="https://freecodecamp.org/reujoe/" rel='noopener noreferrer' target="_blank">Joseph Amofa</a> 
        </div>
      </form> 
      <div className="display">
        {!loading && <Assets assets={assets} assetData={assetData}/>}
        
      </div>
      <div className='center'>
        {loading && <div className="loader"></div>}
      </div>
    </div>
  );
}

export default App;
