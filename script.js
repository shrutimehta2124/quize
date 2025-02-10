const questions = [
    {
        question: " What does HTML stand for?",
        options: ["A) Hyper Transfer Markup Language", "B) Hyper Text Markup Language", 
            "C) High Text Machine Language", "D) Hyperlink and Text Markup Language"],
        answer: "B) Hyper Text Markup Language"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["A) <link>", "B) <a>", "C) <href>", "D) <nav>"],
        answer: " B) <a>"
    },
    // Add 18 more questions here...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 10;

// Load the next question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-button").style.display = "none";
    document.getElementById("timer-seconds").textContent = timeRemaining;
    startTimer();
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer-seconds").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            document.getElementById("next-button").style.display = "inline-block";
        }
    }, 1000);
}

// Handle answer selection
function handleAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    clearInterval(timer); // Stop the timer when an answer is chosen
    document.getElementById("next-button").style.display = "inline-block"; // Show next button
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeRemaining = 10; // Reset the timer
        loadQuestion();
    } else {
        showResults();
    }
}

// Show the results
function showResults() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("score").textContent = `Your score: ${score} out of ${questions.length}`;
}

// Initialize the quiz
loadQuestion();
document.getElementById("next-button").onclick = nextQuestion;
