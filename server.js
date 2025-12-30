const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('NEWS_API_KEY loaded:', process.env.NEWS_API_KEY ? 'yes' : 'no');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/news', async (req, res) => {
  console.log('Fetching news with key:', process.env.NEWS_API_KEY ? 'present' : 'missing');
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=news&pageSize=20&apiKey=${NEWS_API_KEY}`, {
      headers: {
        'User-Agent': 'NewsSummaryApp/1.0'
      }
    });
    console.log('News API response status:', response.status);
    res.json(response.data);
  } catch (error) {
    console.log('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;
  try {
    // 1. Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    
    // 2. Define the prompt clearly
    const prompt = `Summarize the following news article in a 200 paragraph. Use simple, human language. Avoid jargon.: ${text}`;
    
    // 3. Generate and return the result
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    res.json({ summary });
  } catch (error) {
    console.error('Summarize Error:', error.message);
    res.status(500).json({ error: 'Failed to illuminate the news.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});