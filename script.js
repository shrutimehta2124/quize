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
        "question": "Which HTML tag is used to create a hyperlink?",
        "options": ["A) <link>", "B) <a>", "C) <href>", "D) <nav>"],
        "answer": "B) <a>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let skipped = 0;
let timer;
let timeRemaining = 10;
let userResponses = [];

// Start Quiz
document.getElementById("start-quiz-button").onclick = startQuiz;

function startQuiz() {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    skipped = 0;
    userResponses = [];
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-button").style.display = "none";
    document.getElementById("next-button").disabled = true;
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("timer-seconds").textContent = timeRemaining;
    startTimer();
}

// Start Timer
function startTimer() {
    timeRemaining = 10;
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer-seconds").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            handleSkip();
        }
    }, 1000);
}

// Handle Answer Selection
function handleAnswer(selectedOption) {
    clearInterval(timer);
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("next-button").disabled = false;

    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = selectedOption === correctAnswer;

    userResponses.push({
        question: questions[currentQuestionIndex].question,
        options: questions[currentQuestionIndex].options,
        selected: selectedOption,
        correct: correctAnswer,
        status: isCorrect ? "correct" : "wrong"
    });

    if (isCorrect) {
        score++;
    }
}

// Handle Skip
function handleSkip() {
    skipped++;
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("next-button").disabled = false;

    userResponses.push({
        question: questions[currentQuestionIndex].question,
        options: questions[currentQuestionIndex].options,
        selected: "Skipped",
        correct: questions[currentQuestionIndex].answer,
        status: "skipped"
    });
}

// Move to Next Question
document.getElementById("next-button").onclick = function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showSubmitPage();
    }
};

// Show Submit Page
function showSubmitPage() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
}

// Show Score Page
document.getElementById("view-score-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").textContent = `Your Score: ${score} / ${questions.length}`;
};

// Show Response Page
// Show Response Page
// Show Response Page
document.getElementById("view-response-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("response-container").style.display = "block";

    const resultList = document.getElementById("response-list");
    resultList.innerHTML = ""; // Clear previous responses

    userResponses.forEach(response => {
        const li = document.createElement("li");

        // Question text
        li.innerHTML = `<strong>${response.question}</strong><br>`;

        // Iterate over all options for this question
        response.options.forEach(option => {
            let span = document.createElement("span");
            span.textContent = option;
            span.classList.add("option");

            // Create an icon based on answer status (correct, wrong, or skipped)
            let icon = document.createElement("span");

            // If the user selected this option
            if (option === response.selected) {
                span.classList.add(option === response.correct ? "correct" : "incorrect");
                icon.innerHTML = option === response.correct ? "✅" : "❌";
            }

            // If the option is the correct answer (and not selected)
            if (option === response.correct) {
                span.classList.add("correct-answer");
                // If the user did not select the correct answer, show the correct icon
                if (response.selected !== response.correct) {
                    icon.innerHTML = "✅";
                }
            }

            li.appendChild(span);
            li.appendChild(icon);
            li.appendChild(document.createElement("br"));
        });

        // If the question was skipped, show the skipped icon
        if (response.selected === "Skipped") {
            li.innerHTML += `<span class="skipped">⚠️ Skipped</span>`;
        }

        // Append the current question's result to the result list
        resultList.appendChild(li);
    });
};


// Back to Submit Page (From Score & Response)
document.getElementById("back-to-submit-from-score").onclick = function () {
    document.getElementById("score-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
};

document.getElementById("back-to-submit-from-response").onclick = function () {
    document.getElementById("response-container").style.display = "none";
    document.getElementById("submit-container").style.display = "block";
};

// Restart Quiz (Redirect to Start Page)
document.getElementById("restart-quiz-button").onclick = function () {
    document.getElementById("submit-container").style.display = "none";
    document.getElementById("welcome-container").style.display = "block";
};
