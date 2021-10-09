var timeRemaining = 75;
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var intro = document.querySelector(".intro-container");
var questionCounter = 0;
var questions = document.querySelector(".questions-container");
var question = document.querySelector("#question");
var response = document.querySelector("#response");
var finalScore = document.querySelector(".final-score-container");
var saveInitials = document.querySelector("#initials");
var highscores = document.querySelector(".highscore-container");
var scoresEl = document.querySelector("#scores");
var scores = [];

viewScoresBtn = document.querySelector("#view-high-scores");
startBtn = document.querySelector("#start");
answerBtn1 = document.querySelector("#answer-1");
answerBtn2 = document.querySelector("#answer-2");
answerBtn3 = document.querySelector("#answer-3");
answerBtn4 = document.querySelector("#answer-4");
answerBtn = document.querySelector("button.btn-choice");
submitBtn = document.querySelector("#submit-button");
goBackBtn = document.querySelector("#go-back");
clearBtn = document.querySelector("#clear-scores");

var questionsList = [ 
    { 
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3" 
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answer: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3" 
    },
    {
        question: "Commonly used data types do NOT include:",
        answer: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3" 
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answer: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1" 
    }
];

function setTimer() {
    var timerInterval = setInterval(function () {
        timeRemaining--;
        time.textContent = ("Time:" + timeRemaining);

        if (timeRemaining === 0 || questionCounter === questionsList.length) {
            clearInterval(timerInterval);
            questions.style.display = "none";
            finalScore.style.display = "flex";
            score.textContent = timeRemaining;
        }
    }, 1000);
}

function startQuiz () {
    intro.style.display = "none";
    questions.style.display = "flex";
    questionCounter = 0;
    setTimer()
    questionsStart(questionCounter);
}

function questionsStart(id) {
    if (id< questionsList.length) {
        question.textContent = questionsList[id].question;
        answerBtn1.textContent = questionsList[id].answer[0];
        answerBtn2.textContent = questionsList[id].answer[1];
        answerBtn3.textContent = questionsList[id].answer[2];
        answerBtn4.textContent = questionsList[id].answer[3];
        
    }
}


function answerCheck(event) {
    event.preventDefault();
    response.style.display = "flex";
    var responseEl = document.createElement("div");
    response.appendChild(responseEl);

setTimeout(function() {
    responseEl.style.display = "none"
    
}, 1000);

if (questionsList[questionCounter].correctAnswer === event.target.value) {
    responseEl.textContent = "Correct!";
    responseEl.style.color = "green";
    responseEl.style.padding = "5px"
    responseEl.style.fontSize = "25px";
    responseEl.style.fontWeight = "light";
    responseEl.style.fontStyle = "italic";
} else if (questionsList[questionCounter].correctAnswer !== event.target.value) {
    timeRemaining = (timeRemaining - 10);
    responseEl.textContent = "Wrong!";
    responseEl.style.color = "red";
    responseEl.style.padding = "5px";
    responseEl.style.fontSize = "25px";
    responseEl.style.fontWeight = "light";
    responseEl.style.fontStyle = "italic";

}
if (questionCounter < questionsList.length) {
    questionCounter++;
}

questionsStart(questionCounter)

};

function runningScore(event) {
    event.preventDefault();
    finalScore.style.display= "none";
    highscores.style.display = "flex";
    var initialsEl = saveInitials.value.toUpperCase();
    scores.push({saveInitials: initialsEl, score: timeRemaining});

    scores = scores.sort((a, b) => {
        if (a.score , b.score) {
            return 1;
        } else  {
            return -1;
        }

    });

    scoresEl.innerHTML="";
    for(var i = 0; i < scores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = (initialsEl + ": " + timeRemaining);
        scoresEl.append(newLi);
    }
    
}




startBtn.addEventListener("click", startQuiz);

answerBtn1.addEventListener('click', answerCheck);
answerBtn2.addEventListener('click', answerCheck);
answerBtn3.addEventListener('click', answerCheck);
answerBtn4.addEventListener('click', answerCheck);

submitBtn.addEventListener("click", runningScore);






