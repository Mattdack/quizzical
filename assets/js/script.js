console.log("linked");
var questionTextEl = document.querySelector("#question-text");
var startBtnEl = document.querySelector("#start-btn");
var gameBoardEl = document.querySelector('#game-board');
var timerEl = document.querySelector('#time-left');
var index;
var timeInterval;
var questionArray = [
    "This is the text for question 0",
    "This is the text for question 1",
    "This is the text for question 2",
    "This is the text for question 3",
    "This is the text for question 4",
    "This is the text for question 5",
    "This is the text for question 6",
    "This is the text for question 7",
    "This is the text for question 8",
    "This is the text for question 9",
]

var answerArray = [
    ["Answer 0.1", "Answer 0.2", "Answer 0.3", "Answer 0.4"],
    ["Answer 1.1", "Answer 1.2", "Answer 1.3", "Answer 1.4"],
    ["Answer 2.1", "Answer 2.2", "Answer 2.3", "Answer 2.4"],
    ["Answer 3.1", "Answer 3.2", "Answer 3.3", "Answer 3.4"],
    ["Answer 4.1", "Answer 4.2", "Answer 4.3", "Answer 4.4"],
    ["Answer 5.1", "Answer 5.2", "Answer 5.3", "Answer 5.4"],
    ["Answer 6.1", "Answer 6.2", "Answer 6.3", "Answer 6.4"],
    ["Answer 7.1", "Answer 7.2", "Answer 7.3", "Answer 7.4"],
    ["Answer 8.1", "Answer 8.2", "Answer 8.3", "Answer 8.4"],
    ["Answer 9.1", "Answer 9.2", "Answer 9.3", "Answer 9.4"],
]

var answerKeyArray = [
    "Answer 0.1",
    "Answer 1.1",
    "Answer 2.1",
    "Answer 3.1",
    "Answer 4.1",
    "Answer 5.1",
    "Answer 6.1",
    "Answer 7.1",
    "Answer 8.1",
    "Answer 9.1"
]

var indexArray = [0,1,2,3,4,5,6,7,8,9];

function startGame(event) {
    event.preventDefault();
    console.log("The game has started");
    startBtnEl.remove();
    var timeLeft = 300;
    timeInterval = setInterval(function () {
      timeLeft --;
      timerEl.textContent = timeLeft + " seconds left!"
  
      if (timeLeft === 0) {
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000)
    displayQuestion();

}

function displayQuestion() {
    // Selects the shared index for the question and answer
    var rand = (Math.floor(Math.random() * indexArray.length))
    console.log(rand);
    index = indexArray[rand];
    console.log(index);
  

    // Updates header text to that of question and then removes the index from the index array so question/answer pairs are not repeated.
    questionTextEl.textContent = questionArray[index];
    indexArray.splice(rand, 1);
    console.log(indexArray);
    // Creates the answer section of the game board, styles it, and appends each answer to that section.
    var answerSectionEl = document.createElement('section');
    answerSectionEl.setAttribute("id", "answer-section")
    answerSectionEl.style.display = "flex";
    answerSectionEl.style.flexWrap = "wrap";
    answerSectionEl.style.width = "100%";
    answerSectionEl.style.height = "50%"
 
        
    // Grabs the answer set paired to the question and adds them to the game board.
    var specificAnswers = answerArray[index]
    for(i=0; i<4; i++) {
        var eachAnswer = specificAnswers[i];
        var eachAnswerEl = document.createElement('p');
        eachAnswerEl.textContent = eachAnswer;
    
        eachAnswerEl.setAttribute("data-answer-id", i);
        eachAnswerEl.style.flexBasis = "45%";
        eachAnswerEl.style.flexGrow = "1";
        eachAnswerEl.style.flexShrink = "1";
        eachAnswerEl.style.textAlign = "center";
        eachAnswerEl.style.verticalAlign = "center";
        eachAnswerEl.style.border = "4px solid lightgrey"
        eachAnswerEl.style.backgroundColor = "#FDFD96";
        answerSectionEl.append(eachAnswerEl);
    }
    gameBoardEl.append(answerSectionEl);
}

function answerSelection(event) {
    var selectAnswerEl = event.target.tagName;
    if(selectAnswerEl === "P") {
        var answerChoice = event.target.innerText;
        var answerChoiceID = event.target.getAttribute("data-answer-ID");
        if (answerKeyArray.includes(answerChoice)) {
            var correctAnswerChoice = document.querySelector("[data-answer-ID=" + CSS.escape(answerChoiceID) + "]")
            correctAnswerChoice.style.backgroundColor = "#b8d8be";
            setTimeout(nextQuestion, 1000);
        } else {
            var incorrectAnswerChoice = document.querySelector("[data-answer-ID=" + CSS.escape(answerChoiceID) + "]")
            incorrectAnswerChoice.style.backgroundColor = "#FF6961";
            setTimeout(nextQuestion, 1000)
        }
    }
}

function nextQuestion() {
    document.querySelector("#answer-section").remove();
    displayQuestion();
}

startBtnEl.addEventListener("click", startGame);
document.addEventListener('click', answerSelection)

