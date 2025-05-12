import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeatMapGrid } from 'react-heatmap-grid';

const CorrelationHeatmap = () => {
  const [stocks, setStocks] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);
  
  useEffect(() => {
    axios.get('http://20.244.56.144/evaluation-service/stocks')
      .then(response => {
        setStocks(response.data.stocks);
      })
      .catch(error => {
        console.error('Error fetching stocks:', error);
      });
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      const fetchStockData = async () => {
        const prices = [];
        for (let ticker of Object.values(stocks)) {
          const response = await axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=50`);
          prices.push(response.data.map(item => item.price));
        }
        // Calculate correlation between stock prices (Pearson Correlation)
        const correlationMatrix = calculateCorrelation(prices);
        setCorrelationData(correlationMatrix);
      };
      fetchStockData();
    }
  }, [stocks]);

  const calculateCorrelation = (prices) => {
    // Compute Pearson Correlation between stock prices
    // Return a 2D matrix for the heatmap
    return [];
  };

  return (
    <div>
      <h2>Correlation Heatmap</h2>
      <HeatMapGrid data={correlationData} />
    </div>
  );
};

export default CorrelationHeatmap;
