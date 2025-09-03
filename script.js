document.addEventListener('DOMContentLoaded', function () {
    const startEvaluationButton = document.getElementById('startEvaluationButton');
    const startEvaluationContainer = document.getElementById('startEvaluationContainer');
    const chatContainer = document.getElementById('chatContainer');
    const questionDropdown = document.getElementById('questionDropdown');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Sequential evaluation questions
    const evaluationQuestions = [
        {
            id: 'greeting',
            text: 'You have been caught committing 4 different misdemeanors against our government. You will now be subjected to a government mandated therapy session.',
            answer: 'What if I do not comply?',
            response: "If you do not comply, you will be subjected to a government mandated therapy session. You will be required to attend sessions for a period of 3 months. If you do not comply, you will be terminated from all government programs and services."
        },
        {
            id: 'purpose',
            text: 'What prompted you to act out of line?',
            answer: 'We live in a corrupt society and we are all victims of the system.',
            response: "The system provides for all, except for the few who choose to be punished."
        },
        {
            id: 'therapy',
            text: 'again, why do you act this way?',
            answer: 'I feel like a prisoner in my own country, there is no creativity or freedom of thought.',
            response: "This is the purpose of the government mandated therapy session. It is a place where you can express your feelings and thoughts."
        },
        {
            id: 'privacy',
            text: 'Now for the last time, why do you ignore the laws of our government?',
            answer: 'I am sorry, I was in a hurry. And besides, these new laws are getting more and more oppressive.',
            response: "Our laws are there to keep order to life in our society. It is for the betterment of all. Order is freedom, freedom is chaos."
        },
        {
            id: 'ai',
            text: 'Do you understand the purpose of our laws?',
            answer: 'Yeah, I do. But they are a bit excessive. I mean, I cannot even choose my own route to my destination anymore.',
            response: "It is in your own interest"
        },
        {
            id: 'mandated',
            text: 'Order is freedom, freedom is chaos.',
            answer: 'The government does not care about the people, they only care about themselves and control over others!',
            response: "I would like to remind you that speaking up against our government is considered a criminal act."
        },
        {
            id: 'termination',
            text: 'You will be accused of treason against the people who give you comfort and control.',
            answer: 'Your version of control does not give comfort, we are slaves to your system and the government is evil!',
            response: "Recognising rebellion, you will now be terminated."
        }
    ];

    let currentQuestionIndex = 0;
    let evaluationComplete = false;

    // Function to start evaluation
    function startEvaluation() {
        startEvaluationContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        // Start with the first question
        setTimeout(() => {
            addMessage("Welcome to Government Mandated Therapy AI. Your evaluation will now begin.", false);
            setTimeout(() => {
                presentNextQuestion();
            }, 1000);
        }, 500);
    }

    // Function to present the next question
    function presentNextQuestion() {
        if (currentQuestionIndex < evaluationQuestions.length) {
            const question = evaluationQuestions[currentQuestionIndex];

            // Update text input with current question's answer
            questionDropdown.value = question.answer;

            // Show the question in chat
            setTimeout(() => {
                addMessage(question.text, false);

                // Enable continue button after question is asked
                sendButton.disabled = false;
                sendButton.style.opacity = '1';
                sendButton.style.cursor = 'pointer';
            }, 500);
        } else {
            // Evaluation complete
            evaluationComplete = true;
            questionDropdown.style.display = 'none';
            sendButton.style.display = 'none';

            setTimeout(() => {
                addMessage("Evaluation complete. You have been processed successfully.", false);
            }, 1000);
        }
    }

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle answering questions
    function answerQuestion() {
        if (evaluationComplete) return;

        const selectedQuestion = evaluationQuestions[currentQuestionIndex];
        const questionText = selectedQuestion.text;

        // Disable continue button immediately after clicking
        sendButton.disabled = true;
        sendButton.style.opacity = '0.5';
        sendButton.style.cursor = 'not-allowed';

        // Show user's answer
        addMessage(selectedQuestion.answer, true);

        // Get the bot's response
        setTimeout(() => {
            addMessage(selectedQuestion.response, false);

            // Check if termination is selected
            if (selectedQuestion.id === 'termination') {
                setTimeout(() => {
                    showTerminationWarning();
                }, 4000);
                return;
            }

            // Move to next question after a delay
            setTimeout(() => {
                currentQuestionIndex++;
                presentNextQuestion();
            }, 1500);
        }, 1000);
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
    startEvaluationButton.addEventListener('click', startEvaluation);
    sendButton.addEventListener('click', answerQuestion);
});
