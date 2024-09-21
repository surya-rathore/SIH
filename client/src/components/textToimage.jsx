import React, { useState } from 'react';
import './textToimage.css';
import axios from 'axios';

function Texttoimage() {
  const [activeButton, setActiveButton] = useState('AI Chat');
  const [inputText, setInputText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleButtonClick = (label) => {
    setActiveButton(label);
  };
  

  const handleGenerateClick = async () => {
    try {
      const response = await axios.post('http://localhost:4011/textToimage', { text: inputText });
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const objectURL = URL.createObjectURL(imageBlob);
      setImageSrc(objectURL);
    } catch (error) {
      console.error("There was an error generating the image!", error);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <img src="/img/texttoimg/logo 2.png" alt="Astronix Logo" className="logo" />
        <div className="image-placeholder">
          <img src="/img/texttoimg/bg.jpeg" alt="Background Image" className="background-image" />
        </div>
      </header>
      <div className="button-panel">
        {['/img/texttoimg/Voice Talk', '/img/texttoimg/Image Generator', '/img/texttoimg/AI Chat', '/img/texttoimg/Video Generator', '/img/texttoimg/Music Generator'].map((label) => (
          <div
            key={label}
            className={`button ${activeButton === label ? 'active' : ''}`}
            onClick={() => handleButtonClick(label)}
          >
            <div className="icon">
              <img src={`${label.toLowerCase().replace(' ', '-')}.png`} alt={`${label} Icon`} className="features" />
            </div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
      <div className="greeting">
        <h1>What Will You <span>Create...</span></h1>
      </div>
      <div className="input-section">
        <input
          type="text"
          id="input"
          placeholder="Describe what you want to see......"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <button id="btn" onClick={handleGenerateClick}><b>Generate</b></button>
      <div id="image">
        {imageSrc && <img src={imageSrc} alt="Generated" />}
      </div>
    </div>
  );
}

export default Texttoimage;
