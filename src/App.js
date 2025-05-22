import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  // Simulate API call
  useEffect(() => {
    const mockData = [
      { companyName: "Apple Inc.", ticker: "AAPL", price: 189.5 },
      { companyName: "Tesla, Inc.", ticker: "TSLA", price: 719.2 },
      { companyName: "Amazon.com, Inc.", ticker: "AMZN", price: 3371.5 },
      { companyName: "Alphabet Inc.", ticker: "GOOGL", price: 2803.4 },
    ];
    setStocks(mockData);
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">
        📊 Stock Price Aggregator
      </h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-light fw-bold">Available Stocks</Card.Header>
            <Card.Body>
              <Form.Select
                aria-label="Select stock"
                onChange={(e) =>
                  setSelectedStock(
                    stocks.find(stock => stock.ticker === e.target.value)
                  )
                }
              >
                <option value="">-- Select a stock --</option>
                {stocks.map((stock, index) => (
                  <option key={index} value={stock.ticker}>
                    {stock.companyName} ({stock.ticker})
                  </option>
                ))}
              </Form.Select>
            </Card.Body>
          </Card>

          {selectedStock && (
            <Card className="mt-4 shadow-sm">
              <Card.Header className="bg-info text-white">
                {selectedStock.companyName} ({selectedStock.ticker})
              </Card.Header>
              <Card.Body>
                <p><strong>Current Price:</strong> ${selectedStock.price}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
