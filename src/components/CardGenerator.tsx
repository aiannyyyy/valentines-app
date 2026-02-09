import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

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
      {/* Back Button */}
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
              {/* Front of card */}
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

              {/* Back of card */}
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

      <style jsx>{`
        .card-generator-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%);
          padding: 20px;
          position: relative;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #e91e63;
          border-radius: 10px;
          color: #e91e63;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 10;
        }

        .back-button:hover {
          background: #e91e63;
          color: white;
          transform: translateX(-3px);
        }

        .form-container {
          width: 100%;
          max-width: 500px;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.2);
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-card h2 {
          color: #e91e63;
          margin-bottom: 10px;
          text-align: center;
          font-size: 28px;
        }

        .subtitle {
          text-align: center;
          color: #888;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 600;
          text-align: left;
        }

        .helper-text {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          text-align: left;
        }

        .input-field,
        .textarea-field {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #ffc0cb;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          font-family: inherit;
          box-sizing: border-box;
        }

        .input-field:focus,
        .textarea-field:focus {
          outline: none;
          border-color: #e91e63;
          box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.1);
        }

        .generate-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(233, 30, 99, 0.3);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .card-display-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .flip-card {
          width: 400px;
          height: 550px;
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          box-sizing: border-box;
        }

        .flip-card-front {
          background: linear-gradient(135deg, #ff6b9d 0%, #ffa5c0 100%);
          color: white;
        }

        .hearts-decoration {
          font-size: 40px;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        .heart {
          display: inline-block;
          margin: 0 10px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .heart:nth-child(2) {
          animation-delay: 0.3s;
        }

        .heart:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .front-title {
          font-size: 36px;
          margin: 20px 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .roses {
          font-size: 50px;
          margin: 20px 0;
        }

        .tap-text {
          margin-top: 20px;
          font-size: 14px;
          opacity: 0.9;
        }

        .flip-card-back {
          background: white;
          transform: rotateY(180deg);
          color: #333;
        }

        .card-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .top-decoration {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .deco-heart {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
        }

        .dear-text {
          color: #e91e63;
          font-size: 28px;
          margin-bottom: 20px;
          font-family: 'Georgia', serif;
        }

        .message-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-content p {
          font-size: 18px;
          line-height: 1.8;
          color: #555;
          text-align: center;
          max-width: 300px;
        }

        .signature {
          margin-top: 30px;
        }

        .with-love {
          font-style: italic;
          color: #888;
          margin-bottom: 10px;
        }

        .heart-signature {
          font-size: 30px;
        }

        .bottom-decoration {
          margin-top: 20px;
        }

        .small-heart {
          margin: 0 5px;
          font-size: 20px;
          display: inline-block;
          animation: twinkle 2s ease-in-out infinite;
        }

        .small-heart:nth-child(2) {
          animation-delay: 0.4s;
        }

        .small-heart:nth-child(3) {
          animation-delay: 0.8s;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .flip-btn,
        .download-btn,
        .reset-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .flip-btn {
          background: linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%);
          color: white;
        }

        .download-btn {
          background: linear-gradient(135deg, #4caf50 0%, #81c784 100%);
          color: white;
        }

        .reset-btn {
          background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
          color: white;
        }

        .flip-btn:hover,
        .download-btn:hover,
        .reset-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 480px) {
          .flip-card {
            width: 320px;
            height: 450px;
          }

          .form-card {
            padding: 30px 20px;
          }

          .front-title {
            font-size: 28px;
          }

          .dear-text {
            font-size: 24px;
          }

          .message-content p {
            font-size: 16px;
          }

          .back-button {
            top: 10px;
            left: 10px;
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default CardGenerator;