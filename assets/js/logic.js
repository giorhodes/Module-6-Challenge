let currentQuestionsIndex = 0;
let time = questions.length * 15;
let timerID;

// HTML elements
let questionsElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackElement = document.getElementById("feedback");

let sftRight = new Audio("")

function questionClick() {
    if (this.value !== questions[currentQuestionsIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerElement.textContent = time;
        feedBackElement.textContent = "Wrong"
    } else {
        sftRight.play();
        feedBackElement.textContent = "correct";
    }

    feedBackElement.setAttribute("class", "feedback")

    setTimeout(function(){
        feedBackElement.setAttribute("class", "feedback hide")
    }, 1000);

    currentQuestionsIndex++;

    if (currentQuestionsIndex === questions.length) { quizEnd() } else { getQuestions(); }
}

function getQuestions() {
    let currentQuestion = questions[currentQuestionsIndex];
    let titleElement = document.getElementById("question-title");
    titleElement.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, index) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", "choice");
        choiceButton.textContent = `${index + 1}. ${choice}`
        choiceButton.addEventListener("click", questionClick);
        choicesElement.append(choiceButton);
    });
}

function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");
    questionsElement.removeAttribute("class")
    timerID = setInterval(clockTick, 1000);
    timerElement.textContent = time;
    getQuestions();
}

function quizEnd() {
    clearInterval(timerID);
    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");
    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;
    questionsElement.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    let initials = initialElement.value.trim();
    if (initials !== ""){
        let highscores = JSON.parse (localStorage.getItem ("highscores")  || []);
        let newScore = {
            score: time,
            initials: initials

    };

    highscore.push (newScore);
    localStorage.setItem ("highscores", JSON.stringify (highscores));

    window.location.href = "highscores.html";


}




}

function checkForEnter(event) {

        if (event.key ==="Enter") {
            
    saveHighscore();

        }


}

startButton.addEventListener("click", startQuiz);


submitButton.addEventListener("click", saveHighscore);


initialElement.addEventListener("click", checkForEnter);

