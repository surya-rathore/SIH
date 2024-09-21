// Button click interaction
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

//voice talk function, plz don't touch it//

let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}
function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("hii, Good Morning ")
        }
        else if(hours>=12 && hours <16){
            speak("hii, Good afternoon")
        }
        else{
            speak("hii, Good Evening")
        }
        }
        window.addEventListener("load",()=>{
           wishMe()
        })
    let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition =new speechRecognition()
     recognition.onresult=(event)=>{
        let currentIndex=event.resultIndex
        let transcript=event.results[currentIndex][0].transcript
       // content.innerText=transcript
       takeCommand(transcript.toLowerCase())
    }
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
if(message.includes("hello")){
    speak("hello dear, how can i help you")
}
else if(message.includes("good morning")){
    speak("good morning dear")
}
else if(message.includes("good afternoon")){
        speak("good afternoon dear")
    }
else if(message.includes("good evening")){
            speak("good evening dear")
        }
else if(message.includes("help me")){
            speak("yes,how can i help you")
        }
else if(message.includes("tum kaun ho")){
    speak("mai nix hu")
}
else if(message.includes("hu r u")){
    speak("I am nix, created by team The Coding Crew")
}
else if(message.includes("who are you")){
    speak("I am nix, created by team, The Coding Crew")
}
else if(message.includes("tumhe kisne banaya hai")){
    speak("mujhe, the coding crew, ke developers ne banaya hai ")
}
else if(message.includes("who is your owner")){
    speak("my owner is the coding crew team")
}
else if(message.includes("tumhara owner kaun hai")){
    speak("mera owner the coding crew team hai")
}
else if(message.includes("tumhen kisne develop kiya hai")){
    speak("mujhe the coding crew team ne develop kiya hai")
}

else if(message.includes("your name")){
    speak("my name is nix")
}
else if(message.includes("where are you from")){
    speak("sorry, its a secret")
}
else if(message.includes("how are you")){
        speak("I'm good")
}
else if(message.includes("how r u")){
    speak("I'm good")
}
/*link pages*/

else if(message.includes("open youtube")){
    speak("opening youtube")
    window.open("https://www.youtube.com","_blank")
}

else if(message.includes("open chat gpt")){
    speak("opening Chat GPT")
    window.open("https://chatgpt.com","_blank")
}

else if(message.includes("open google")){
    speak("opening google")
    window.open("https://www.google.com","_blank")
}

else if(message.includes("open instagram")){
    speak("opening Instagram")
    window.open("https://www.instagram.com","_blank")
}

else if(message.includes("open wikipedia")){
    speak("opening Wikipedia")
    window.open("https://www.wikipedia.org","_blank")
}

else if(message.includes("open facebook")){
    speak("opening Facebook")
    window.open("https://www.facebook.com","_blank")
}

else if(message.includes("open calculator")){
    speak("opening calculator..")
    window.open("calculator://")
}

else if(message.includes("open figma")){
    speak("opening Figma..")
    window.open("Figma://")
}

else if(message.includes("open calendar")){
    speak("opening Calendar..")
    window.open("calendar://")
}

else if(message.includes("open spotify")){
    speak("opening spotify..")
    window.open("spotify://")
}

else if(message.includes("open figma")){
    speak("opening Figma..")
    window.open("Figma://")
}

else if(message.includes("open vs code")){
    speak("opening vs code..")
    window.open("Visual Studio Code://")
}
else if(message.includes("play song")){
    speak("playing song")
    window.open("https://open.spotify.com/track/7xWuWeREbqbLnxBG5qFt08")
}
else if(message.includes("time")){
    let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
    speak(time)
}
else if(message.includes("date")){
    let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
    speak(date)
}

else{
  let finalText="this is what i found on internet regarding"+message.replace("nix","") ||  message.replace("next","")||message.replace("nex","")
    speak(finalText)
    window.open(`https://www.google.com/search?q=${message.replace("nix","")}`,"_blank")
}
}