import React, {useEffect} from 'react'
const endPoint = "http://localhost:9000/currency/" //my node js back-end

export default function Crypto({ asset }) {
    let { id, name, symbol, quote } = asset

   const fetchMetadata = async () => {
    try {
        let response = await fetch(endPoint+id)
        response = await response.json()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
   }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        if(id === 1)
            fetchMetadata()
    }, []);

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
        <div ><span className='coin-name'>{name}</span> <span>({symbol})</span></div>
        <div className='price'>{price}</div>
        <div className={oneH}>{percent_change_1h}</div>
        <div className={twoFourH}>{percent_change_24h}</div>
        <div className={sevenD}>{percent_change_7d}</div>
        <div className='price'>{market_cap}</div>
        <div className='price'>{volume_24h}</div>
        </>
    )
}
