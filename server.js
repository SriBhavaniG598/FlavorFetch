// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // If using Node <18

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const APP_ID = '36843dea';
const APP_KEY = 'f2047f9cd4b78f7a2f438fa416913a68';

app.get('/api/recipes', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
