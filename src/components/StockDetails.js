import React, { useEffect, useState } from 'react';
import { fetchStockPrice, fetchStockHistory } from '../api';
import { Card, Table, Spinner } from 'react-bootstrap';

const StockDetails = ({ ticker }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticker) {
      setLoading(true);
      Promise.all([
        fetchStockPrice(ticker),
        fetchStockHistory(ticker, 50),
      ])
        .then(([priceRes, historyRes]) => {
          setCurrentPrice(priceRes.data.stock);
          setHistory(historyRes.data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [ticker]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card>
      <Card.Header as="h5">Details for: {ticker}</Card.Header>
      <Card.Body>
        <h6>Current Price: ${currentPrice?.price}</h6>
        <p>Last Updated: {new Date(currentPrice?.lastUpdatedAt).toLocaleString()}</p>
        <h6 className="mt-4">Price History (Last 50 Minutes)</h6>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Price ($)</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{entry.price}</td>
                <td>{new Date(entry.lastUpdatedAt).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default StockDetails;
