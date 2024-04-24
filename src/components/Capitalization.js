'use client';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from "../app/AppContext";
import { getAllCurrencies } from '../utils/api';
import Currencies from '../components/Currencies';
import Loading from '../utils/Loading';
import { FaFire } from "react-icons/fa";
import SearchedCoin from './SearchedCoin';
import { search } from '../utils/api';

const Capitalization = () => {
  const { currency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide } = useContext(AppContext);

  const [currencies, setCurrencies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);

  const searchDiv = useRef();
  const magnifyIcon = useRef();
  const closeSearchDivIcon = useRef();
  const ignoreMount = useRef(false);
  const timeOut = useRef();

  const currencyChange = (event) => {
    setVsCurrency(event.target.value);
  };

  const revealInput = (event) => {
    if (closeSearchDivIcon.current && event.currentTarget === closeSearchDivIcon.current) {
      if (searchDiv.current) {
        searchDiv.current.style.right = "-100%";
      }
      setSearched([]);
      setSearchInput("");
    } else if (magnifyIcon.current && event.currentTarget === magnifyIcon.current) {
      if (searchDiv.current) {
        searchDiv.current.focus();
        searchDiv.current.style.right = "0%";
      }
    }
  };

  useEffect(() => {
    const getCurrency = async () => {
      const data = await getAllCurrencies(vsCurrency);
      setCurrencies([...data]);
    };
    getCurrency();
  }, [vsCurrency]);

  useEffect(() => {
    if (ignoreMount.current) {
      if (searchInput.length !== 0) {
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(async () => {
          const data = await search(searchInput);
          setSearched(data.coins);
        }, 3000);
      } else {
        setSearched([]);
      }
    } else {
      ignoreMount.current = true;
    }
  }, [searchInput]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="p-3 h-full relative flex flex-col before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-white/10 overflow-y-auto scrollbar-thin scrollbar-track-gray-600/60 scrollbar-thumb-gray-600 scrollbar-rounded-full scrollbar-left">
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex font-bold text-lg tracking-wide"><FaFire className="mr-3 mt-1 " /> <span className="flex w-full">
        Top Currencies 
        </span></h2>
        <select
          value={vsCurrency}
          onChange={currencyChange}
          className="rounded-lg px-2 py-1 font-bold text-sm outline-none bg-transparent border overflow-auto scrollbar-thin scrollbar-track-gray-600/60 scrollbar-thumb-gray-600"
        >
          <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="rub">RUB</option>
            <option value="idr">IDR</option>
            <option value="krw">KRW</option>
            <option value="cny">CNY</option>
            <option value="twd">TWD</option>
            <option value="jpy">JPY</option>
            <option value="aed">AED</option>
            <option value="bdt">BDT</option>
            <option value="brl">BRL</option>
            <option value="clp">CLP</option>
            <option value="gbp">GBP</option>
            <option value="ils">ILS</option>
            <option value="lkr">LKR</option>
            <option value="myr">MYR</option>
            <option value="nzd">NZD</option>
            <option value="pln">PLN</option>
            <option value="sgd">SGD</option>
            <option value="uah">UAH</option>
            <option value="zar">ZAR</option>
            <option value="ars">ARS</option>
            <option value="bhd">BHD</option>
            <option value="cad">CAD</option>
            <option value="czk">CZK</option>
            <option value="hkd">HKD</option>
            <option value="inr">INR</option>
            <option value="mmk">MMK</option>
            <option value="ngn">NGN</option>
            <option value="php">PHP</option>
            <option value="sar">SAR</option>
            <option value="thb">THB</option>
            <option value="vef">VEF</option>
            <option value="xdr">XDR</option>
            <option value="aud">AUD</option>
            <option value="bmd">BMD</option>
            <option value="chf">CHF</option>
            <option value="dkk">DKK</option>
            <option value="huf">HUF</option>
            <option value="kwd">KWD</option>
            <option value="mxn">MXN</option>
            <option value="nok">NOK</option>
            <option value="pkr">PKR</option>
            <option value="sek">SEK</option>
            <option value="try">TRY</option>
            <option value="vnd">VND</option>
        </select>
      </div>

      <div className="relative text-gray-600 focus-within:text-gray-400 mb-4 w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          className="py-2 text-sm bg-transparent border rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
          placeholder="Search Currency"
          autoComplete="off"
          value={searchInput}
          onChange={handleChange}
        />
      </div>

      {currencies.length === 0 ? (
        <Loading />
      ) : (
        <div className="relative w-full h-full">
          <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-gray-600/60 scrollbar-thumb-gray-600 scrollbar-rounded-full scrollbar-left absolute">
            {searched.length !== 0 ? (
              searched.map((coin) => (
                <SearchedCoin
                  key={coin.id}
                  name={coin.name}
                  image={coin.large}
                  id={coin.id}
                  pickedCurrency={currency}
                />
              ))
            ) : (
              currencies.map((coin) => (
                <Currencies
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  currentPrice={coin.current_price}
                  marketCap={coin.market_cap}
                  id={coin.id}
                  pickedCurrency={currency}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Capitalization;