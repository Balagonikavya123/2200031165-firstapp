import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

export const fetchAllStocks = () => axios.get(BASE_URL);

export const fetchStockPrice = (ticker) => axios.get(`${BASE_URL}/${ticker}`);

export const fetchStockHistory = (ticker, minutes) =>
  axios.get(`${BASE_URL}/${ticker}?minutes=${minutes}`);
