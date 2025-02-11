const questions = [
    {
        "question": "What does HTML stand for?",
        "options": ["A) Hyper Transfer Markup Language", "B) Hyper Text Markup Language", "C) High Text Machine Language", "D) Hyperlink and Text Markup Language"],
        "answer": "B) Hyper Text Markup Language"
    },
    {
        "question": "Which HTML tag is used to create a hyperlink?",
        "options": ["A) <link>", "B) <a>", "C) <href>", "D) <nav>"],
        "answer": "B) <a>"
    },
    {
        "question": "Which HTML element is used to define the title of a document?",
        "options": ["A) <meta>", "B) <head>", "C) <title>", "D) <header>"],
        "answer": "C) <title>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let skipped = 0;
let timer;
let timeRemaining = 10;
let answers = []; // Store user responses

// Start Quiz
document.getElementById("start-quiz-button").onclick = startQuiz;

function startQuiz() {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

// Load Next Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-button").style.display = "none";
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("timer-seconds").textContent = timeRemaining;

    startTimer();
}

// Start Timer
function startTimer() {
    timeRemaining = 10;
    document.getElementById("timer-seconds").textContent = timeRemaining;

    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer-seconds").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            skipped++;
            answers.push({ question: questions[currentQuestionIndex].question, selected: "Skipped", correct: questions[currentQuestionIndex].answer });
            showNextOrSubmitButton();
        }
    }, 1000);
}

// Handle Answer Selection
function handleAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    answers.push({ question: questions[currentQuestionIndex].question, selected: selectedOption, correct: correctAnswer });
    clearInterval(timer);
    showNextOrSubmitButton();
}

// Show Next Button or Submit Button
function showNextOrSubmitButton() {
    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById("next-button").style.display = "inline-block";
    } else {
        document.getElementById("submit-button").style.display = "inline-block";
    }
}

// Move to Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
}

// Show Results Page (Fixed)
function showResults() {
    document.getElementById("quiz-container").style.display = "none"; // Hide quiz
    document.getElementById("results-container").style.display = "block"; // Show results

    const resultList = document.getElementById("result-list");
    resultList.innerHTML = ""; // Clear previous results

    answers.forEach(answer => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${answer.question}</strong> <br>
                       Your answer: <span class="${answer.selected === answer.correct ? 'correct' : 'incorrect'}">${answer.selected}</span> <br>
                       Correct answer: <span class="correct">${answer.correct}</span>`;
        resultList.appendChild(li);
    });

    document.getElementById("final-score").textContent = `Your score: ${score} out of ${questions.length}`;
    document.getElementById("skipped-count").textContent = `Skipped questions: ${skipped}`;
}

// Attach event listeners
document.getElementById("next-button").onclick = nextQuestion;
document.getElementById("submit-button").onclick = showResults;
