import React, { useEffect, useState } from 'react';

function StocksComponent() {
  const [stocks, setStocks] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken'); // token should be stored after login

  useEffect(() => {
    fetch('http://20.244.56.144/evaluation-service/stocks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setStocks(data.stocks))
      .catch(err => setError(err.message));
  }, []);

  const fetchStockDetails = (ticker) => {
    fetch(`http://20.244.56.144/evaluation-service/stocks/${ticker}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setSelectedStock(ticker);
        setStockDetails(data.stock);
      })
      .catch(err => setError(err.message));
  };

  if (error) return <div>Error: {error}</div>;
  if (!stocks) return <div>Loading stock list...</div>;

  return (
    <div className="stock-container">
      <h2>Available Stocks</h2>
      <ul>
        {Object.entries(stocks).map(([name, symbol]) => (
          <li key={symbol}>
            <button onClick={() => fetchStockDetails(symbol)}>
              {name} ({symbol})
            </button>
          </li>
        ))}
      </ul>

      {stockDetails && (
        <div className="stock-details">
          <h3>{selectedStock}</h3>
          <p><strong>Price:</strong> ${stockDetails.price.toFixed(2)}</p>
          <p><strong>Last Updated:</strong> {new Date(stockDetails.lastUpdatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default StocksComponent;
