import { useState, useEffect } from "react";
import "./Birthday.css";

const Birthday = () => {
  const [step, setStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [showFinal, setShowFinal] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // Refined messages array
  const messages = [
    "You are the most amazing person I've ever met ✨",
    "Thank you for always taking care of me with so much love ❤️",
    "You're my guiding light - a mentor, a helper, my true north 🌟",
    "I pray you're blessed with endless success and happiness 🙏",
    "Happy Birthday to my dearest friend! 🎂"
  ];

  // Beautifully formatted full message
  const fullMessage = `🎂 Happy Happy Happiest Birthday, Dear! 🎂

May God bless you abundantly with love, wealth, and the most beautiful life imaginable! 🌈✨

You truly are the best person I've ever met - may life give you even more than you deserve! 🥳❤️😎

Thank you for being that special someone who always cares for me from the bottom of your heart 🥹

A little kinder soul, a wonderful mentor, a helping hand always extended, and my compass when I lose direction 🌟

I constantly pray that God blesses you with boundless success, that life treats you gently, and that you never forget how incredibly special you are to me ❤️

No matter where life takes us, my first prayer to God will always be for your happiness and well-being 🌍🙏

Happy birthday to someone who means more to me than words could ever express 🥺

And yes, I must admit... I'm eagerly waiting to become a "Chachu" to the most adorable kiddo! 🤣👶

May this birthday bring you as much joy as you've brought into my life! 🎉`;

  // Response messages
  const responses = {
    soon: {
      emoji: "🎉🤩👶🚀",
      title: "Woohoo! That's Awesome!",
      message: "I'm already planning all the fun adventures, toys, and secret treats!",
      note: "Promise I'll be the coolest, funnest Chachu ever! 😎"
    },
    later: {
      emoji: "⏳😊🎁",
      title: "I'll Wait Patiently...",
      message: "Good things come to those who wait, right?",
      note: "But remember, my spoiling skills are ready whenever you are! 😉"
    }
  };

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

  const handleAnswer = (selected) => {
    setAnswer(selected);
    setConfettiActive(true);
    setTimeout(() => {
      setShowFinal(true);
    }, 2000);
  };

  const resetAll = () => {
    setStep(0);
    setShowQuestion(false);
    setAnswer(null);
    setShowFinal(false);
    setConfettiActive(false);
  };

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

            {/* Gift Lid */}
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

            {/* Tap instruction */}
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
                <span className="highlight">Can I ask you something?</span>
              </p>
              
              <div className="single-question">
                <h3>When will I become "Chachu"?</h3>
                <p className="question-hint">Of the most adorable kiddo! 🤣👶</p>
              </div>

              <div className="answer-options">
                <button 
                  className={`option-btn ${answer === 'soon' ? 'selected' : ''}`}
                  onClick={() => handleAnswer('soon')}
                >
                  <span className="option-emoji">🚀</span>
                  <span className="option-text">SOON!</span>
                  <span className="option-subtext">(1-2 years from now)</span>
                </button>
                
                <button 
                  className={`option-btn ${answer === 'later' ? 'selected' : ''}`}
                  onClick={() => handleAnswer('later')}
                >
                  <span className="option-emoji">⏳</span>
                  <span className="option-text">LATER...</span>
                  <span className="option-subtext">(5+ years later)</span>
                </button>
              </div>

              {answer && (
                <div className={`answer-response ${answer}-response`}>
                  <div className="response-emoji">{responses[answer].emoji}</div>
                  <h4>{responses[answer].title}</h4>
                  <p>{responses[answer].message}</p>
                  <p className="special-note">{responses[answer].note}</p>
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
              {fullMessage.split('\n\n').map((paragraph, index) => {
                const hasEmojis = /[\u{1F600}-\u{1F6FF}]/u.test(paragraph);
                const isFirstLine = index === 0;
                
                return (
                  <p 
                    key={index} 
                    className={`message-paragraph ${
                      hasEmojis ? 'emoji-line' : ''
                    } ${
                      isFirstLine ? 'first-line' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="answer-showcase">
              {answer && (
                <div className={`your-answer ${answer}`}>
                  <span className="answer-label">Your choice:</span>
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