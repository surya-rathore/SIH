// Button click interaction
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Input section mic button animation
document.querySelector('.mic-button').addEventListener('click', () => {
   
});

// code of Microphone


 
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

 if (SpeechRecognition) {
     const recognition = new SpeechRecognition();


     recognition.continuous = false; 
     recognition.interimResults = false; 
     recognition.lang = 'en-US'; 

    
     const micButton = document.getElementById('micButton');
     const inputField = document.getElementById('speechInput');

    
     micButton.addEventListener('click', () => {
         recognition.start(); 
         micButton.innerText = '🎙️'; 
     });

    
     recognition.onresult = (event) => {
         const transcript = event.results[0][0].transcript; 
         inputField.value = transcript; 
         micButton.innerText = '🎤'; 
     };

  
     recognition.onend = () => {
         micButton.innerText = '🎤'; 
     };

    
     recognition.onerror = (event) => {
         console.error("Speech recognition error:", event.error);
         micButton.innerText = '🎤'; 
     };
 } else {
     // If speech recognition is not supported
     console.error("Sorry, your browser does not support Speech Recognition.");
     micButton.disabled = true; 
 }