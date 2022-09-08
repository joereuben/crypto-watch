import React from 'react'
import Crypto from './Crypto'

export default function Assets({assets}) {
  
  return (
    <div className='assets'>
      
        <div className='head'>ID</div>
        <div className='head'>Coin</div>
        <div className='head price'>Price</div>
        <div className='head price'>1hr%</div>
        <div className='head price'>24hr%</div>
        <div className='head price'>7d%</div>
        <div className='head price'>Market Cap</div>
        <div className='head price'>Volume (24hrs)</div>
       
      {
        assets.map(asset => {
            return <Crypto key={asset.id} asset={asset}/>
        })
      }
    </div>
  )
}
