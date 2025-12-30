import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news');
      setNews(response.data.articles || []);
      setError('');
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news feed. Please check your connection.');
    }
  };

  const handleArticleClick = async (article) => {
    setSelectedArticle(article);
    setSummary('');
    setLoading(true);

    try {
      const summaryResponse = await axios.post('http://localhost:5000/api/summarize', {
        text: article.description || article.content || article.title
      });
      setSummary(summaryResponse.data.summary);
      setError('');
    } catch (error) {
      console.error('Error processing article:', error);
      setError('Failed to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
<nav className="navbar">
  <div className="nav-content">
    <div className="brand-container">
      <span className="logo">Lumen</span>
      <span className="tagline">News, Illuminated.</span>
    </div>
    <div className="status-indicator">Live Updates</div>
  </div>
</nav>

      <main className="main-layout">
<aside className="sidebar">
  <div className="sidebar-header">
    <h3>Trending Stories</h3>
  </div>
  <div className="news-list">
    {news.map((article, index) => (
      <div 
        key={index} 
        className={`news-item ${selectedArticle === article ? 'active' : ''}`}
        onClick={() => handleArticleClick(article)}
      >
        <div className="news-item-content">
          {/* Headline */}
          <h4 className="news-title">{article.title}</h4>
          
          {/* Source and SEE MORE Link */}
          <div className="news-meta">
            <span className="source-tag">{article.source?.name}</span>
            
            {/*See More Link right under the headline */}
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sidebar-see-more"
              onClick={(e) => e.stopPropagation()} 
            >
              See More →
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</aside>

        <section className="reader-view">
          {selectedArticle ? (
            <div className="article-container">
              <header className="article-header">
                <h1>{selectedArticle.title}</h1>
                <p className="original-link">Source: <strong>{selectedArticle.source?.name}</strong></p>
              </header>
              
              <div className="summary-section">
                <div className="section-title">
                  <span className="ai-icon">✨</span>
                  <h3>AI Summary</h3>
                </div>
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Analyzing article context...</p>
                  </div>
                ) : (
                  <div className="summary-text">
                    {summary || "Click an article to generate a summary."}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📰</div>
              <h2>Select an article to begin</h2>
              <p>Choose a story from the left to generate an instant summary.</p>
            </div>
          )}
          {error && <div className="error-toast">{error}</div>}
        </section>
      </main>
    </div>
  );
}

export default App;