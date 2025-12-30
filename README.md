💡Lumen - News, Illuminated.

Lumen is a modern web application built with frontend and backend technologies. It fetches real‑time headlines through APIs and uses Gemini 3 Flash Preview to create short, easy‑to‑understand summaries. 


🚀 The Vision

Our vision is to save time of users, no need to read the whole article.
It can help to get multiple news article's information into a "Illuminated" summary at the same time which is consumed by one lengthy article. Ultimetyl in it, our time is saved and we know time is money. 

✨ Features

- Real-Time Feed: Fetches the latest global stories using the NewsAPI.
- AI-Powered "Illumination": Uses Google Gemini (Gemini 3 Flash Preview) to    generate concise, jargon-free summaries.
- Time saving – quick summaries mean less reading, more learning.
- User‑friendly design – simple interface that’s easy for youth to use. 
- One‑click access – no need to search across many sites.
- Works anytime – fetches news 24/7 from trusted sources

🛠️ Tech Stack
- HTML/CSS – for layout and styling
- JavaScript – for frontend interactivity and dynamic behaviour
- React.js – for building a smooth and responsive user interface
- Node.js – for backend logic and server-side operations
- Express.js – framework to handle routes and API requests
- Gemini API(Gemini Ai Studio) – used Gemini 3 Flash Preview for AI-powered  news summarization
- News API(newsapi.org) – to fetch real-time headlines from their sources

⚙️ Quick Start
1. Prerequisites
Need of NewsAPI Key and a Google Gemini API Key to fetch the news and summarize the news.

2. Installation
1. Clone the repo:git clone (https://github.com/rajankumar9835/lumen.git)

2. Setup Backend
cd backend
npm install
- Create a .env file and add the keys:
- NEWS_API_KEY=key
- GEMINI_API_KEY=key
node server.js

3. Setup Frontend
cd frontend
npm install
npm start

🔒 Security Note
This project uses .env files and a root-level .gitignore to ensure that sensitive API keys are never leaked to GitHub.