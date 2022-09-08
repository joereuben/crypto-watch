import React from 'react'

export default function Crypto({ asset, logo }) {
    let { id, name, symbol, quote } = asset

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let price = formatter.format(quote.USD.price.toFixed(2))
    let percent_change_1h = quote.USD.percent_change_1h.toFixed(2)
    let percent_change_24h = quote.USD.percent_change_24h.toFixed(2)
    let percent_change_7d = quote.USD.percent_change_7d.toFixed(2)
    let market_cap =  formatter.format(quote.USD.market_cap.toFixed(2))
    let volume_24h =  formatter.format(quote.USD.volume_24h.toFixed(2))

    let oneH = percent_change_1h < 0 ? 'neg' : 'pc'
    let twoFourH = percent_change_24h < 0 ? 'neg' : 'pc'
    let sevenD = percent_change_7d < 0 ? 'neg' : 'pc'

    percent_change_1h = Math.abs(percent_change_1h)
    percent_change_24h = Math.abs(percent_change_24h)
    percent_change_7d = Math.abs(percent_change_7d)
    
    
    return(
        <>
        <div className=''>{id}</div>
        <div className='primary'>
            <img src={logo} alt="" className='ic_logo' />
            <div>
                <span className='coin-name'>{name}</span> <span>({symbol})</span>
            </div>
            
        </div>
        <div className='price'>{price}</div>
        <div className={oneH}>{percent_change_1h}</div>
        <div className={twoFourH}>{percent_change_24h}</div>
        <div className={sevenD}>{percent_change_7d}</div>
        <div className='price'>{market_cap}</div>
        <div className='price'>{volume_24h}</div>
        </>
    )
}
