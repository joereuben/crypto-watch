import React from 'react'
import Crypto from './Crypto'

export default function Assets({assets}) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='assets'>
      
        <div className='head'>Coin</div>
        <div className='head price'>Price</div>
        <div className='head price'>Volume (24hrs)</div>
        <div className='head'>Market Symbol</div>
       
      {
        assets.map(asset => {
            let { asset_id, price_usd, name, volume_1day_usd } = asset
            if(!price_usd)
                price_usd = 1.00

            price_usd = formatter.format(price_usd.toFixed(2))
            volume_1day_usd = formatter.format(volume_1day_usd)
            return(
                <>
                <div className='coin-name'>{name}</div>
                <div className='price'>{price_usd}</div>
                <div className='price'>{volume_1day_usd}</div>
                <div>{asset_id}</div>
                </>
            )
        })
      }
    </div>
  )
}
