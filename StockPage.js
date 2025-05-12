import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [timeInterval, setTimeInterval] = useState(50); // Default interval (50 minutes)
  
  useEffect(() => {
    axios.get(`http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=${timeInterval}`)
      .then(response => {
        setStockData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock prices:', error);
      });
  }, [timeInterval]);

  const calculateAverage = (data) => {
    const prices = data.map(item => item.price);
    const sum = prices.reduce((acc, val) => acc + val, 0);
    return sum / prices.length;
  };

  const data = {
    labels: stockData.map(item => new Date(item.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(item => item.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Stock Price Chart (NVDA)</h2>
      <Line data={data} />
      <p>Average Price: {calculateAverage(stockData).toFixed(2)}</p>
      <button onClick={() => setTimeInterval(50)}>50 Minutes</button>
      <button onClick={() => setTimeInterval(100)}>100 Minutes</button>
    </div>
  );
};

export default StockPage;
