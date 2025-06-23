const resultElement = document.getElementById("result");
let recognition;
let isRecognizing = false;
let finalTranscript = '';

// Function to start speech recognition
function startConverting() {

    console.log("startConverting called");
    alert("Starting speech recognition...");



    if ('webkitSpeechRecognition' in window) {
        if (!recognition) {
            recognition = new webkitSpeechRecognition();
            setupRecognition();
        }

        recognition.start();
        isRecognizing = true;
    } else {
        alert("Speech Recognition is not supported in this browser.");
    }
}

// Function to configure the recognition instance
function setupRecognition() {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;
            transcript = transcript.replace(/\n/g, "<br>");

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        resultElement.innerHTML = `
            <span style="color: black;">${finalTranscript}</span>
            <span style="color: gray;">${interimTranscript}</span>
        `;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error", event.error);
    };

    recognition.onend = function () {
        if (isRecognizing) {
            recognition.start(); // Restart recognition if it stops unexpectedly
        }
    };
}

// Function to stop speech recognition
function stopConverting() {
    if (recognition && isRecognizing) {
        isRecognizing = false;
        recognition.stop();
    }
}
