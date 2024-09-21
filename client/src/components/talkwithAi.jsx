import React, { useState } from 'react';
import './talkwithAi.css';

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  
  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const processAction = async () => {
    // Check if the browser supports the MediaDevices API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.start();
      setIsListening(true);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioData = await audioBlob.arrayBuffer();
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData))); // Convert to base64

        // Send the audio data to the server
        const response = await fetch('http://localhost:4011/process-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: base64Audio }),
        });

        const result = await response.json();
        const audioResponse = new Audio(`data:audio/mp3;base64,${result.audioContent}`);
        audioResponse.play();
        setIsListening(false);
      };

      // Stop recording after 3 seconds
      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000); // Adjust this as needed
    } else {
      alert('Your browser does not support audio recording.');
    }
  };

  return (
    <div className="dashboard">
      <header>
        <img src="/img/talkwithai/logo 2.png" alt="Astronix Logo" className="logo" />
        <div className="image-placeholder">
          <img src="/img/talkwithai/1.jpeg" alt="Astronix Logo" className="background-image" />
        </div>
      </header>
      <div className="button-panel">
        {['/img/talkwithai/Voice Talk', '/img/talkwithai/Image Generator', '/img/talkwithai/AI Chat', '/img/talkwithai/Video Generator', '/img/talkwithai/Music Generator'].map((label, index) => (
          <div
            key={index}
            className={`button ${activeButton === index ? 'active' : ''}`}
            onClick={() => handleButtonClick(index)}
          >
            <div className="icon">
              <img src={`${label.toLowerCase().replace(' ', '-')}.png`} alt={label} className="features" />
            </div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
      <div className="greeting">
        <h1>Lets talk <span><b>together...</b></span></h1>
      </div>
      <div id="btn">
        <button className="pulse" onClick={processAction}>
          <img src="/img/talkwithai/voice talk.jpg" className="bg" alt="Voice Talk" />
        </button>
      </div>
      {isListening && <img src="/img/talkwithai/loader-image.gif" alt="voice" id="voice" />}
    </div>
  );
};

export default Dashboard;
