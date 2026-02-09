import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './CardGenerator.css';

interface CardGeneratorProps {
  onBack?: () => void;
}

const CardGenerator: React.FC<CardGeneratorProps> = ({ onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerateCard = () => {
    if (userName.trim()) {
      setShowForm(false);
      setIsFlipped(true);
    }
  };

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
        });
        
        const link = document.createElement('a');
        link.download = `valentine-card-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  const handleReset = () => {
    setShowForm(true);
    setIsFlipped(false);
    setUserName('');
    setUserMessage('');
  };

  return (
    <div className="card-generator-container">
      {onBack && (
        <button onClick={onBack} className="back-button">
          ← Back to Home
        </button>
      )}

      {showForm ? (
        <div className="form-container">
          <div className="form-card">
            <h2>💝 Create Your Valentine Card</h2>
            <p className="subtitle">Personalize your message of love</p>
            
            <div className="form-group">
              <label htmlFor="name">Recipient's Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message (Optional)</label>
              <textarea
                id="message"
                placeholder="Happy Valentine's Day! Always remember that you are worth it. Be kind to other people..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="textarea-field"
                rows={5}
              />
              <p className="helper-text">Leave blank to use default message</p>
            </div>

            <button 
              onClick={handleGenerateCard}
              disabled={!userName.trim()}
              className="generate-btn"
            >
              ✨ Generate Card
            </button>
          </div>
        </div>
      ) : (
        <div className="card-display-container">
          <div 
            ref={cardRef}
            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="hearts-decoration">
                  <span className="heart">💖</span>
                  <span className="heart">💝</span>
                  <span className="heart">💗</span>
                </div>
                <h1 className="front-title">Happy Valentine's Day</h1>
                <div className="roses">🌹🌹🌹</div>
                <p className="tap-text">Click to open →</p>
              </div>

              <div className="flip-card-back">
                <div className="card-content">
                  <div className="top-decoration">
                    <span className="deco-heart">❤️</span>
                  </div>
                  
                  <h2 className="dear-text">Dear {userName},</h2>
                  
                  <div className="message-content">
                    {userMessage ? (
                      <p>{userMessage}</p>
                    ) : (
                      <p>
                        Happy Valentine's Day! Always remember that you are worth it. 
                        Be kind to other people and spread love wherever you go. 
                        You make the world a better place! 💕
                      </p>
                    )}
                  </div>

                  <div className="signature">
                    <p className="with-love">With Love,</p>
                    <div className="heart-signature">💌</div>
                  </div>

                  <div className="bottom-decoration">
                    <span className="small-heart">💕</span>
                    <span className="small-heart">💖</span>
                    <span className="small-heart">💕</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(!isFlipped);
              }}
              className="flip-btn"
            >
              {isFlipped ? '🔄 Flip to Front' : '🔄 Flip to Back'}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadCard();
              }}
              className="download-btn"
            >
              📥 Download Card
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="reset-btn"
            >
              🔙 Create New Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGenerator;