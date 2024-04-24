'use client';
import React, { useContext } from 'react';
import { AppContext } from "../app/AppContext";

const Currencies = ({ name, image, currentPrice, marketCap, pickedCurrency, id }) => {
  const { vsCurrency, setCurrency, setShowCapSide } = useContext(AppContext);

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const selectedCoinPricesStyle = () => {
    return id === pickedCurrency ? "rgb(211 211 211)" : "rgb(183 183 183 / 62%)";
  }

  const changeCoin = () => {
    setCurrency(id);
    setShowCapSide(false);
  }

  const currencySymbol = marketCap.toLocaleString('en-US', {
    style: 'currency',
    currency: vsCurrency || 'USD', // Provide a fallback currency code (e.g., 'USD')
  }).replace(/,*[0-9]+./g, '');

  return (
    <div
      onClick={changeCoin}
      className={`p-1 mb-1 flex justify-between ${
        id === pickedCurrency ? 'bg-teal-accent-400 text-teal-900 p-2' : 'bg-transparent p-2'
      } rounded-md transition-colors duration-150 ease-in-out cursor-pointer`}
    >
      <div className="flex">
        <img src={image} alt="coin_image" className="w-10 h-10 mr-2 rounded-full" />
        <div className="my-auto">
          <h4 className="text-lg font-semibold leading-tight">{name}</h4>
          <p className={`text-sm leading-6 ${selectedCoinPricesStyle()}`}>
            {currencySymbol} {numberWithSpaces(marketCap)}
          </p>
        </div>
      </div>
      <p className={`text-sm self-end pb-1 ${selectedCoinPricesStyle()}`}>
        {currentPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: vsCurrency || 'USD', // Provide a fallback currency code (e.g., 'USD')
        })}
      </p>
    </div>
  );
}

export default Currencies;