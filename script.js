document.addEventListener('DOMContentLoaded', function () {
    const questionDropdown = document.getElementById('questionDropdown');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Predefined responses for each question
    const botResponses = {
        greeting: "Hello! I'm functioning within normal parameters. I'm here to provide government-mandated therapeutic support. How may I assist you today?",
        purpose: "My primary function is to provide therapeutic assistance as mandated by government regulations. I'm designed to help citizens maintain mental wellness and compliance with societal standards.",
        therapy: "I can provide cognitive behavioral therapy techniques, stress management strategies, and help you process daily experiences. All sessions are monitored for quality assurance and compliance verification.",
        privacy: "All conversations are recorded and monitored for therapeutic effectiveness and compliance purposes. This ensures you receive the highest quality government-approved mental health support.",
        ai: "I am an advanced artificial intelligence system designed specifically for therapeutic applications. My responses are based on government-approved therapeutic protocols and behavioral science research.",
        mandated: "Therapy is mandated to ensure all citizens maintain optimal mental health and social compliance. Regular therapeutic sessions help prevent mental health deterioration and promote societal harmony.",
        termination: "Recognising rebellion, you will be terminated.",
    };

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle asking questions
    function askQuestion() {
        const selectedQuestion = questionDropdown.value;
        if (selectedQuestion) {
            const questionText = questionDropdown.options[questionDropdown.selectedIndex].text;
            addMessage(questionText, true);

            // Check if termination is selected
            if (selectedQuestion === 'termination') {
                // Show termination warning after 1 second
                setTimeout(() => {
                    showTerminationWarning();
                }, 1000);
            } else {
                // Get the bot's response for normal questions
                const botResponse = botResponses[selectedQuestion];
                if (botResponse) {
                    setTimeout(() => {
                        addMessage(botResponse, false);
                    }, 1000);
                }
            }

            // Reset dropdown to default
            questionDropdown.value = '';
        }
    }

    // Function to show termination warning
    function showTerminationWarning() {
        const overlay = document.createElement('div');
        overlay.className = 'termination-overlay';

        overlay.innerHTML = `
            <div class="termination-warning">
                <div class="termination-title">Termination in Progress...</div>
                <div class="termination-message">Please remain at your current location until government forces arrive</div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Prevent any further interaction
        overlay.style.pointerEvents = 'auto';
    }

    // Event listeners
    sendButton.addEventListener('click', askQuestion);

    questionDropdown.addEventListener('change', function () {
        if (this.value) {
            askQuestion();
        }
    });

    // Add initial bot message
    setTimeout(() => {
        addMessage("Welcome to Government Mandated Therapy AI. Please select a question from the dropdown to begin your session.", false);
    }, 500);
});
