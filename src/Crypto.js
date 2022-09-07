import React from 'react'

export default function Crypto({ asset }) {
    let { asset_id, price_usd, name, volume_1day_usd } = asset
    if(price_usd)
        price_usd = price_usd.toFixed(2)
    return (
        <div className="box">
            <div className='coin-name'>{name}</div>
            <div>{price_usd}</div>
            <div>{volume_1day_usd}</div>
            <div>{asset_id}</div>
        </div>
    )
}
