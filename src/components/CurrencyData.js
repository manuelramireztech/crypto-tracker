import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../app/AppContext';
import { getCoinData } from '../utils/api';
import Loading from '../utils/Loading';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { MdOutlineMultilineChart } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { CgPinAlt } from "react-icons/cg";
import { TbReload } from "react-icons/tb";
import { useTheme } from 'next-themes';

const CurrencyData = () => {
  const { currency, vsCurrency } = useContext(AppContext);
  const [coinData, setCoinData] = useState([]);
  let supplyPercent = useRef(0);
  let marketCapToBTC = useRef(0);
  let volume24ToBtc = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    setCoinData([]);
    const coin = async () => {
      const data = await getCoinData(currency);
      setCoinData(data);
      supplyPercent.current = Number(((data.market_data.total_supply / data.market_data.max_supply) * 100)).toFixed(0);
      marketCapToBTC.current = 0;
      volume24ToBtc.current = 0;
      data.tickers.forEach(item => {
        marketCapToBTC.current += item.converted_volume.btc
        volume24ToBtc.current += item.converted_last.btc
      })
    }
    coin();
  }, [currency]);

  if (coinData.length === 0) return <Loading />

  return (
    <div className="p-3 h-full flex flex-col items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center p-2">
          <img src={coinData.image.small} className="mr-2" alt="" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-2xl flex items-center tracking-wide text-center">
              {coinData.name}
              <span className="ml-1 font-medium">
                ({(coinData.symbol).toUpperCase()})
              </span>
            </h3>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <p className="font-medium text-2xl leading-5 tracking-wide">Price:</p>
          <p className="text-2xl font-semibold tracking-wide ml-2">
            {coinData.market_data.current_price[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
          </p>
          <div className="flex items-center ml-1">
            <div className={`h-5 ${coinData.market_data.price_change_percentage_24h >= 1 ? 'bg-teal-accent-400' : 'bg-red-500'} text-sm font-bold rounded-full px-2 flex items-center`}>
              <span>{`${(Math.abs(coinData.market_data.price_change_percentage_24h_in_currency[vsCurrency]).toFixed(2))}%`}</span>
              <span className={`h-3 w-3 ${coinData.market_data.price_change_percentage_24h_in_currency[vsCurrency] < 1 ? 'transform rotate-180' : ''}`}></span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 border rounded-md w-full">
        <div className="p-4 border-r flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2"><MdOutlineMultilineChart /></span>
            <span className="font-bold">Market Cap</span>
          </div>
          <p className="text-sm text-center">
            {coinData.market_data.market_cap[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
          </p>
          <p className="text-xs mt-3 text-center">{(marketCapToBTC.current).toFixed(1)} {(coinData.symbol).toUpperCase()}</p>
        </div>
        <div className="p-4 border-r flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2"><MdElectricBolt /></span>
            <span className="font-bold">Volume (24h)</span>
          </div>
          <p className="text-sm text-center">
            {coinData.market_data.total_volume[vsCurrency].toLocaleString('en-US', { style: 'currency', currency: `${vsCurrency}`, minimumFractionDigits: 0})}
          </p>
          <p className="text-xs mt-3 text-center">{(volume24ToBtc.current).toFixed(1)} {(coinData.symbol).toUpperCase()}</p>
        </div>
        <div className="p-4 border-r flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2"><CgPinAlt /></span>
            <span className="font-bold">Max Supply</span>
          </div>
          {(coinData.market_data.max_supply !== null) ? (
            <div className="flex flex-col items-center">
              <p className="text-sm text-center">
                {String(coinData.market_data.max_supply).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {(coinData.symbol).toUpperCase()}
              </p>
              <div className="flex items-center w-full mt-3">
                <div className="w-2/5 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-accent-400" style={{ width: `${Number(supplyPercent.current)}%` }}></div>
                </div>
                <p className="text-xs ml-2 text-center">{supplyPercent.current}%</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Nothing Found</p>
          )}
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2"><TbReload /></span>
            <span className="font-bold">Circulating Supply</span>
          </div>
          <p className="text-sm text-center">
            {String(coinData.market_data.circulating_supply).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {(coinData.symbol).toUpperCase()}
          </p>
        </div>
      </div>
      <div className="flex-grow w-full">
        <AdvancedRealTimeChart
          symbol={`${coinData.symbol}usdt`}
          theme={theme === 'dark' ? 'dark' : 'light'}
          height={"550"}
          width={"100%"}
          timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
          copyrightStyles={{ parent: { display: "none" } }}
        />
      </div>
    </div>
  );
}

export default CurrencyData;