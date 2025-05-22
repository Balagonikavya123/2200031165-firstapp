import React, { useEffect, useState } from 'react';
import { fetchAllStocks } from '../api';
import { Card, ListGroup, Spinner } from 'react-bootstrap';

const StockList = ({ onSelect }) => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStocks()
      .then((res) => {
        setStocks(res.data.stocks);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card>
      <Card.Header as="h5">Available Stocks</Card.Header>
      <ListGroup variant="flush">
        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" />
          </div>
        ) : (
          Object.entries(stocks).map(([name, ticker]) => (
            <ListGroup.Item
              key={ticker}
              action
              onClick={() => onSelect(ticker)}
            >
              {name} ({ticker})
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default StockList;
