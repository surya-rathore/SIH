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

// Get references to elements
const greetingSuggestions = document.querySelector('.greeting-suggestions');
const chatbotContainer = document.getElementById('chatbotContainer');
const responsePanel = document.getElementById('responsePanel');
const sendButton = document.getElementById('sendButton');
const speechInput = document.getElementById('speechInput');
const imageRecognition = document.getElementById('imageRecognition');
const fileInput = document.getElementById('fileInput');

sendButton.addEventListener('click', () => {
    const inputText = speechInput.value.trim();

    if (inputText !== '') {
       
        greetingSuggestions.style.display = 'none';

        
        chatbotContainer.style.display = 'block';

        
        const newParagraph = document.createElement('p');
        newParagraph.textContent = inputText;
        responsePanel.appendChild(newParagraph);

        
        speechInput.value = '';

        
        chatbotContainer.scrollTop = chatbotContainer.scrollHeight;
    }
});


imageRecognition.addEventListener('click', () => {
    fileInput.click();  
});


fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';  
            img.style.borderRadius = '10px';  

            
            responsePanel.appendChild(img);

            
            chatbotContainer.style.display = 'block';

           
            chatbotContainer.scrollTop = chatbotContainer.scrollHeight;
        };
        reader.readAsDataURL(file);  
    }
});
