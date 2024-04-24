import axios from 'axios';

const getAllCurrencies = async (vsCurrency) => {
  const apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error 400: Bad Request');
      console.error('Error message:', error.response.data);
      // Handle the 400 error, e.g., return an empty array or throw a custom error
      return [];
    } else {
      console.error('An error occurred:', error.message);
      // Handle other errors, e.g., return an empty array or throw a custom error
      return [];
    }
  }
};

const getCoinData = async (coin) => {
  const apiLink = `https://api.coingecko.com/api/v3/coins/${coin}`;
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error 400: Bad Request');
      console.error('Error message:', error.response.data);
      // Handle the 400 error, e.g., return null or throw a custom error
      return null;
    } else {
      console.error('An error occurred:', error.message);
      // Handle other errors, e.g., return null or throw a custom error
      return null;
    }
  }
};

const search = async (searchValue) => {
  const apiLink = `https://api.coingecko.com/api/v3/search?query=${searchValue}`;
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error 400: Bad Request');
      console.error('Error message:', error.response.data);
      // Handle the 400 error, e.g., return an empty object or throw a custom error
      return {};
    } else {
      console.error('An error occurred:', error.message);
      // Handle other errors, e.g., return an empty object or throw a custom error
      return {};
    }
  }
};

export { getAllCurrencies, getCoinData, search };
