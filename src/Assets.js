import React from 'react'
import Crypto from './Crypto'

export default function Assets({assets, assetData}) {
  
  return (
    <div className='assets'>
      
        <div className='head'>ID</div>
        <div className='head'>Coin</div>
        <div className='head price'>Price</div>
        <div className='head price'>1hr %</div>
        <div className='head price'>24hr %</div>
        <div className='head price'>7d %</div>
        <div className='head price'>Market Cap</div>
        <div className='head price'>Volume (24hrs)</div>
       
      {
        assets.map(asset => {

          let logo = ""
          if(Object.keys(assetData).length > 0)
            logo = assetData[asset.id].logo
          return <Crypto key={asset.id} asset={asset} logo={logo}/>
        })
      }
      
    </div>
  )
}
