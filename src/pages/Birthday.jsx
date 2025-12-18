import { useState, useEffect } from "react";
import "./Birthday.css";

const Birthday = () => {
  const [step, setStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showFinal, setShowFinal] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // All messages in sequence
  const messages = [
    "You are the best person I ever met",
    "Thank you being the person who always take care of me from the bottom of the heart",
    "A little kinder, a good mentor, a helping hand and a person gives me direction when I was wrong",
    "I always pray from god that they bless u with more and more success",
    "Happy happy happiest birthday dear ❤️❤️🥳"
  ];

  // Full message
  const fullMessage = `Happy happy happiest birthday dear ❤️❤️🥳
  
  May god bless you with everything love wealth and beautiful life 😋😋
  
  You are the best person I ever met in my life may god give u more than you deserve 🥳❤️😎
  
  Thank you being the person who always take care of me from the bottom of the heart 🥳🥳🥳
  
  A little kinder, a good mentor, a helping hand and a person gives me direction when I was wrong 😌😌
  
  I always pray from god that they bless u with more and more success and may life always be gentle with you and may never forget how special you are to me ❤️❤️
  
  No matter where life takes us but i always pray for u first from god 😎😛😁😁
  
  Happy birthday to the person who means more to me than I can ever fully explain 🥺
  
  And one more thing i am waiting to become a chachu 🤣🤣 of a beautiful kido 🤣🤣`;

  // Handle gift tap
  const handleTap = () => {
    if (step < messages.length) {
      setStep(step + 1);
      if (step === messages.length - 1) {
        setTimeout(() => {
          setShowQuestion(true);
        }, 1000);
      }
    }
  };

  // Handle answer selection
  const handleAnswer = (selected) => {
    setAnswer(selected);
    setConfettiActive(true);
    setTimeout(() => {
      setShowFinal(true);
    }, 2000);
  };

  // Reset everything
  const resetAll = () => {
    setStep(0);
    setShowQuestion(false);
    setAnswer(null);
    setShowFinal(false);
    setConfettiActive(false);
  };

  // Confetti effect
  useEffect(() => {
    if (confettiActive) {
      const timer = setTimeout(() => setConfettiActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [confettiActive]);

  return (
    <div className="gift-container">
      {/* Background hearts */}
      <div className="hearts-bg">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="heart-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.3 + 0.1
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Confetti */}
      {confettiActive && (
        <div className="confetti-overlay">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#EF476F'][i % 5],
                animationDelay: `${Math.random() * 0.5}s`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      {!showQuestion && !showFinal ? (
        <div className="gift-stage">
          {/* Gift Box */}
          <div 
            className={`gift-box ${step > 0 ? 'opened' : ''}`}
            onClick={handleTap}
          >
            {/* Ribbon */}
            <div className="ribbon vertical"></div>
            <div className="ribbon horizontal"></div>
            
            {/* Gift Bow */}
            <div className="bow">
              <div className="bow-center"></div>
              <div className="bow-loop left"></div>
              <div className="bow-loop right"></div>
            </div>

            {/* Gift Lid - opens on click */}
            <div className={`gift-lid ${step > 0 ? 'open' : ''}`}>
              <div className="lid-top"></div>
              <div className="lid-side front"></div>
              <div className="lid-side back"></div>
            </div>

            {/* Gift Body */}
            <div className="gift-body">
              <div className="gift-pattern">
                <div className="pattern-line horizontal"></div>
                <div className="pattern-line vertical"></div>
                <div className="pattern-dots">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="dot"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tap instruction - only on first step */}
            {step === 0 && (
              <div className="tap-hint">
                <div className="tap-icon">👇</div>
                <p>Tap to open your gift!</p>
              </div>
            )}
          </div>

          {/* Message Display Area */}
          <div className="message-area">
            {step > 0 && (
              <div className="message-card">
                <div className="message-number">
                  Message {step} of {messages.length}
                </div>
                <div className="message-content">
                  {messages[step - 1]}
                </div>
                
                {/* Next button */}
                {step < messages.length && (
                  <button className="next-message-btn" onClick={handleTap}>
                    Next Message 💌
                  </button>
                )}
                
                {/* Progress dots */}
                <div className="progress-dots">
                  {messages.map((_, index) => (
                    <div 
                      key={index}
                      className={`dot ${index < step ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Instruction when gift is opened */}
            {step === messages.length && (
              <div className="ready-for-question">
                <div className="sparkle">✨</div>
                <p>Ready for a special question?</p>
                <button 
                  className="ask-question-btn"
                  onClick={() => setShowQuestion(true)}
                >
                  Ask Me! ❓
                </button>
              </div>
            )}
          </div>
        </div>
      ) : showQuestion && !showFinal ? (
        /* Question Screen */
        <div className="question-screen">
          <div className="question-card">
            <div className="question-header">
              <span className="question-icon">❓</span>
              <h2>Just One Question...</h2>
            </div>
            
            <div className="question-content">
              <p className="question-text">
                <span className="highlight">Apse ek question puchu?</span>
              </p>
              
              <div className="single-question">
                <h3>When will I become "Chachu"?</h3>
                <p className="question-hint">Of a beautiful kiddo! 🤣🤣</p>
              </div>

              <div className="answer-options">
                <button 
                  className={`option-btn ${answer === 'soon' ? 'selected' : ''}`}
                  onClick={() => handleAnswer('soon')}
                >
                  <span className="option-emoji">🚀</span>
                  <span className="option-text">SOON!</span>
                  <span className="option-subtext">(1-2 saal mein)</span>
                </button>
                
                <button 
                  className={`option-btn ${answer === 'later' ? 'selected' : ''}`}
                  onClick={() => handleAnswer('later')}
                >
                  <span className="option-emoji">⏳</span>
                  <span className="option-text">LATER...</span>
                  <span className="option-subtext">(5+ saal baad)</span>
                </button>
              </div>

              {answer === 'soon' && (
                <div className="answer-response soon-response">
                  <div className="response-emoji">🎉🤩👶</div>
                  <h4>Yay! Exciting!</h4>
                  <p>I'm ready to spoil them with love, toys, and all the fun! 🎮🍫🚗</p>
                  <p className="excited-msg">Can't wait to be the coolest Chachu ever! 🤣</p>
                </div>
              )}

              {answer === 'later' && (
                <div className="answer-response later-response">
                  <div className="response-emoji">😢⏰🎁</div>
                  <h4>Okay... I'll wait</h4>
                  <p>Patiently waiting for my turn to be Chachu... ⏳</p>
                  <p className="funny-note">But don't take too long! I've got spoiling to do! 😉</p>
                </div>
              )}
            </div>

            {answer && (
              <button 
                className="see-final-btn"
                onClick={() => setShowFinal(true)}
              >
                See Complete Message 📜
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Complete Message */
        <div className="final-screen">
          <div className="final-card">
            <div className="final-header">
              <div className="header-decoration">
                <span>🎂</span>
                <span>❤️</span>
                <span>🎉</span>
              </div>
              <h1>Happy Birthday! 🥳</h1>
              <div className="header-decoration">
                <span>🎁</span>
                <span>✨</span>
                <span>🥂</span>
              </div>
            </div>

            <div className="final-message">
              {fullMessage.split('\n\n').map((paragraph, index) => (
                <p key={index} className="message-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="answer-showcase">
              {answer && (
                <div className={`your-answer ${answer}`}>
                  <span className="answer-label">Your answer:</span>
                  <span className="answer-value">
                    {answer === 'soon' ? 'SOON! 🚀' : 'LATER... ⏳'}
                  </span>
                </div>
              )}
            </div>

            <div className="final-wish">
              <p className="special-wish">
                Wishing you the most amazing birthday filled with love, laughter, and wonderful memories! 🌟
              </p>
              <div className="signature">
                — Your Best Friend ❤️
              </div>
            </div>

            <button className="reset-all-btn" onClick={resetAll}>
              🎁 Open Another Gift
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Birthday;