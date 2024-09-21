import React, { useEffect, useState } from 'react';
import './talkwithAi.css';

const Dashboard = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    wishMe();
  }, []);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const processAction = () => {
    recognition.start();
    setIsListening(true);
  };

  const speak = (text) => {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = 'hi-GB';
    window.speechSynthesis.speak(textSpeak);
  };

  const wishMe = () => {
    const day = new Date();
    const hours = day.getHours();

    if (hours >= 0 && hours < 12) {
      speak('Hii, Good Morning');
    } else if (hours >= 12 && hours < 16) {
      speak('Hii, Good Afternoon');
    } else {
      speak('Hii, Good Evening');
    }
  };

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase();
    takeCommand(transcript);
  };

  const takeCommand = (message) => {
    setIsListening(false);

    if (message.includes('hello')) {
      speak('Hello dear, how can I help you');
    } else if (message.includes('open youtube')) {
      speak('Opening YouTube');
      window.open('https://www.youtube.com', '_blank');
    }
    // Add more commands here based on your original JavaScript logic
    else {
      speak(`This is what I found on the internet regarding ${message}`);
      window.open(`https://www.google.com/search?q=${message}`, '_blank');
    }
  };

  return (
    <div className="dashboard">
      <header>
        <img src="/img/logo 2.png" alt="Astronix Logo" className="logo" />
        <div className="image-placeholder">
          <img src="/img/1.jpeg" alt="Astronix Logo" className="background-image" />
        </div>
      </header>
      <div className="button-panel">
        {['/img/Voice Talk', '/img/Image Generator', '/img/AI Chat', '/img/Video Generator', '/img/Music Generator'].map((label, index) => (
          <div
            key={index}
            className={`button ${activeButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            <div className="icon">
              <img src={`${label.toLowerCase().replace(' ', '-')}.png`} alt="" className="features" />
            </div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
      <div className="greeting">
        <h1>
          Let's talk <span><b>together...</b></span>
        </h1>
      </div>
      <div id="btn">
        <button className="pulse" onClick={processAction}>
          <img src="/img/voice talk.jpg" className="bg" alt="Voice Talk" />
        </button>
      </div>
      {isListening && <img src="/img/loader-image.gif" alt="voice" id="voice" />}
    </div>
  );
};

export default Dashboard;
