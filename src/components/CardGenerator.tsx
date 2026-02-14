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
  const [userFrom, setUserFrom] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          useCORS: true,
          allowTaint: true,
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
    setUserFrom('');
    setUserMessage('');
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              <label htmlFor="from">Your Name (Optional)</label>
              <input
                id="from"
                type="text"
                placeholder="From..."
                value={userFrom}
                onChange={(e) => setUserFrom(e.target.value)}
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

            <div className="form-group">
              <label htmlFor="image">Add a Picture (Optional)</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="file-input"
              />
              {uploadedImage && (
                <div className="image-preview">
                  <img src={uploadedImage} alt="Preview" />
                  <button 
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
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
                  
                  {uploadedImage && (
                    <div className="card-image">
                      <img src={uploadedImage} alt="Card image" crossOrigin="anonymous" />
                    </div>
                  )}
                  
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
                    {userFrom ? (
                      <p className="from-name">{userFrom}</p>
                    ) : (
                      <div className="heart-signature">💌</div>
                    )}
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