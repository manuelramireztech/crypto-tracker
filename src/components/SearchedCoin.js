'use client';
import React, { useContext } from 'react';
import { AppContext } from '../app/AppContext';

const SearchedCoin = ({name, image, id, pickedCurrency}) => {
  const {setCurrency, setShowCapSide} = useContext(AppContext);

  const changeCoin = () => {
    setCurrency(id);
    setShowCapSide(false);
  }

  return (
    <div
  onClick={changeCoin}
  className={`p-1 mb-1 flex justify-between ${
    id === pickedCurrency
      ? "bg-teal-accent-400 text-teal-900 rounded-md transition-colors duration-150 ease-in-out cursor-pointer"
      : "bg-transparent text-dark dark:text-white rounded-md transition-colors duration-150 ease-in-out cursor-pointer"
  } w-full`}
>
  <div className="flex">
    <img src={image} alt="coin_image" className="w-10 h-10 mr-2" />
    <div className="my-auto">
      <h4 className="text-base font-semibold leading-tight">{name}</h4>
    </div>
  </div>
</div>
  );
}

export default SearchedCoin;
