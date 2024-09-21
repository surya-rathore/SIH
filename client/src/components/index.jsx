import React, { useState, useEffect } from 'react';
import './index.css';

const Index = () => {
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    // Initialize any required features on load
  }, []);

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSendButton = async () => {
    if (textInput.trim() !== '') {
      const backendResponse = await sendTextToBackend(textInput); // Sending text to backend
      setResponse(backendResponse);
      setTextInput('');
    }
  };

  const sendTextToBackend = async (text) => {
    try {
      const response = await fetch('http://localhost:4011/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      return data.reply; // Assuming your backend sends a 'reply' field in JSON response
    } catch (error) {
      console.error('Error sending text:', error);
      return 'Sorry, something went wrong.';
    }
  };

  const processVoice = async () => {
    try {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.start();
      setIsListening(true);

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        const backendResponse = await sendTextToBackend(transcript); // Send voice transcription to backend
        setResponse(backendResponse);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Error with speech recognition:', event);
        setIsListening(false);
      };
    } catch (error) {
      console.error('Error with speech input:', error);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <img src="/img/index/logo 2.png" alt="Astronix Logo" className="logo" />
        <div className="image-placeholder">
          <img src="/img/index/1.jpeg" alt="Astronix Logo" className="background-image" />
        </div>
      </header>

      <div className="button-panel">
        <div className="button">
          <div className="icon">
            <img src="/img/index/voice-talk.png" alt="" className="features" />
          </div>
          <div className="label">Voice Talk</div>
        </div>
        <div className="button">
          <div className="icon">
            <img src="/img/index/image-generator.png" alt="" className="features" />
          </div>
          <div className="label">Image Generator</div>
        </div>
        <div className="button active">
          <div className="icon">
            <img src="/img/index/ai-chat.png" alt="" className="features" />
          </div>
          <div className="label">Ai Chat</div>
        </div>
        <div className="button">
          <div className="icon">
            <img src="/img/index/video-generator.png" alt="" className="features" />
          </div>
          <div className="label">Video Generator</div>
        </div>
        <div className="button">
          <div className="icon">
            <img src="/img/index/music-generator.png" alt="" className="features" />
          </div>
          <div className="label">Music Generator</div>
        </div>
      </div>

      <div className="greeting">
        <h1>Hello, <span>there</span></h1>
        <p>How can I help you today...</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          id="speechInput"
          placeholder="Enter a prompt here..."
          value={textInput}
          onChange={handleInputChange}
        />
        <button className="send-button" onClick={handleSendButton}>
          ➦
        </button>
        <button id="micButton" className="mic-button" onClick={processVoice}>
          🎤
        </button>
        {isListening && <p>Listening...</p>}
      </div>

      <div className="response-section">
        <p>{response}</p>
      </div>

      <div className="suggestions">
        <div className="suggestion">"Need help? Ask me anything."</div>
        <div className="suggestion">"Ask me to translate words or phrases."</div>
        <div className="suggestion">"Get help with software or hardware problems."</div>
        <div className="suggestion">"I'm ready to help. Feel free to ask."</div>
      </div>
    </div>
  );
};

export default Index;
