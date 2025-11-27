const express = require('express');
const app = express();

// Use ENV port or default
const port = process.env.SERVER_PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
