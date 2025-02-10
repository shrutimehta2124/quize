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
    },
    {
        "question": "What is the correct HTML tag for inserting a line break?",
        "options": ["A) <br>", "B) <lb>", "C) <break>", "D) <nl>"],
        "answer": "A) <br>"
    },
    {
        "question": "Which attribute is used to specify the source of an image in HTML?",
        "options": ["A) src", "B) href", "C) alt", "D) img"],
        "answer": "A) src"
    },
    {
        "question": "What does CSS stand for?",
        "options": ["A) Creative Style Sheets", "B) Cascading Style Sheets", "C) Computer Style Sheets", "D) Colorful Style Sheets"],
        "answer": "B) Cascading Style Sheets"
    },
    {
        "question": "How do you apply an external CSS file to an HTML document?",
        "options": ["A) <style src='styles.css'>", "B) <link rel='stylesheet' href='styles.css'>", "C) <css href='styles.css'>", "D) <script src='styles.css'>"],
        "answer": "B) <link rel='stylesheet' href='styles.css'>"
    },
    {
        "question": "Which property is used to change the background color in CSS?",
        "options": ["A) color", "B) background-color", "C) bgcolor", "D) background"],
        "answer": "B) background-color"
    },
    {
        "question": "How do you make a text bold using CSS?",
        "options": ["A) font-weight: bold;", "B) text-bold: true;", "C) style: bold;", "D) text-weight: bold;"],
        "answer": "A) font-weight: bold;"
    },
    {
        "question": "What is the default position of an HTML element?",
        "options": ["A) relative", "B) fixed", "C) absolute", "D) static"],
        "answer": "D) static"
    },
    {
        "question": "Which keyword is used to declare a variable in JavaScript?",
        "options": ["A) var", "B) let", "C) const", "D) All of the above"],
        "answer": "D) All of the above"
    },
    {
        "question": "How do you write 'Hello, World!' in an alert box?",
        "options": ["A) msg('Hello, World!');", "B) alert('Hello, World!');", "C) prompt('Hello, World!');", "D) message('Hello, World!');"],
        "answer": "B) alert('Hello, World!');"
    },
    {
        "question": "Which symbol is used for single-line comments in JavaScript?",
        "options": ["A) //", "B) /* */", "C) #", "D) --"],
        "answer": "A) //"
    },
    {
        "question": "What is the output of typeof(null) in JavaScript?",
        "options": ["A) null", "B) undefined", "C) object", "D) string"],
        "answer": "C) object"
    },
    {
        "question": "Which function is used to convert a string to an integer in JavaScript?",
        "options": ["A) parseInt()", "B) toInteger()", "C) parseNumber()", "D) intConvert()"],
        "answer": "A) parseInt()"
    },
    {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "options": ["A) onhover", "B) onmouseclick", "C) onclick", "D) onpress"],
        "answer": "C) onclick"
    },
    {
        "question": "Which of the following is NOT a valid CSS unit?",
        "options": ["A) px", "B) em", "C) cm", "D) dp"],
        "answer": "D) dp"
    },
    {
        "question": "How can you center a div using CSS flexbox?",
        "options": ["A) align: center;", "B) display: flex; justify-content: center; align-items: center;", "C) center: flex;", "D) flex: center;"],
        "answer": "B) display: flex; justify-content: center; align-items: center;"
    },
    {
        "question": "How do you select an element with id 'myID' in CSS?",
        "options": ["A) #myID", "B) .myID", "C) id=myID", "D) element(myID)"],
        "answer": "A) #myID"
    },
    {
        "question": "What will console.log(2 + '2') output in JavaScript?",
        "options": ["A) 4", "B) 22", "C) NaN", "D) TypeError"],
        "answer": "B) 22"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 10;

// Show the welcome message and start quiz button
document.getElementById("start-quiz-button").onclick = startQuiz;

function startQuiz() {
    // Hide the welcome screen and show the quiz screen
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    
    // Start the quiz
    loadQuestion();
}

// Load the next question and answers
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

// Start the timer for each question
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

// Handle the user's answer selection
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

// Show the results after all questions
function showResults() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("score").textContent = `Your score: ${score} out of ${questions.length}`;
}

// Initialize the "Next Question" button
document.getElementById("next-button").onclick = nextQuestion;
