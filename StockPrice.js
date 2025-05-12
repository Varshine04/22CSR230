axios.get('http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=50')
  .then(response => {
    // Handle response and extract stock price data
  })
  .catch(error => {
    console.error('Error fetching stock prices:', error);
  });
