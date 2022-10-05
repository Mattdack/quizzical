console.log("linked");
var questionTextEl = document.querySelector("#question-text");
var startBtnEl = document.querySelector("#start-btn");
var gameBoardEl = document.querySelector("#game-board");
var timerEl = document.querySelector("#time-left");
var index;
var timeInterval;
var timeLeft;
var questionAnswered = 0;
var hasChosen;

var questionArray = [
  "In Lord of the Rings: Fellowship of the Ring, what was the size of the party sent to destroy the One Ring?",
  "Who stars in the hit show Alias?",
  "In World of Warcraft Classic, who is the leader of the Horde?",
  "What is Turk's petname for the main character John Dorian in the hit show Scrubs?",
  "What was the name of the destroyed planet that was home to Leia Skywalker?",
  "What team is tied for the most franchise NBA Championships?",
  "Which gaseous element naturally occurs as a diatomic molecule?",
  "What type of vector is Zika Virus?",
  "Who painted the American Gothic?",
  "How many inhabited US territories exist in 2022?",
];

var answerArray = [
  ["11 beings", "10 beings", "9 beings", "12 beings"],
  ["Jennifer Gardner", "Jennifer Hudson", "Jennifer Lawrence", "Jennifer Anison"],
  ["Baine Bloodhoof", "Thrall", "Deathwing", "Gul'dan"],
  ["Vanilla Bear", "Dr. Acula", "Johnny", "J.D"],
  ["Alderaan", "Hoth", "Tatooine", "Naboo"],
  ["Spurs", "Warriors", "Bulls", "Lakers"],
  ["Hydrogen", "Nitrogen", "Neon", "Helium"],
  ["Gram-Positive Bacilli", "Coronavirus", "Flavivirus", "Retrovirus"],
  ["Vincent van Gogh", "Johannes Mosart", "Leonardo DaVinci", "Grant Wood"],
  ["Three", "Five", "Seven", "Fourteen"],
];

var answerKeyArray = [
  "9 beings",
  "Jennifer Gardner",
  "Thrall",
  "Vanilla Bear",
  "Alderaan",
  "Lakers",
  "Nitrogen",
  "Flavivirus",
  "Grant Wood",
  "Five",
];

var indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Starts the timer and loads the first question.
function startGame(event) {
  event.preventDefault();
  console.log("The game has started");
  startBtnEl.remove();
  timeLeft = 300;
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft + " seconds left!";

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      quizEnd();
    }
  }, 1000);
  displayQuestion();
}

function displayQuestion() {
  // Selects the shared index for the question and answer
  var rand = Math.floor(Math.random() * indexArray.length);
  console.log(rand);
  index = indexArray[rand];
  console.log(index);

  // Updates header text to that of question and then removes the index from the index array so question/answer pairs are not repeated.
  questionTextEl.textContent = questionArray[index];
  indexArray.splice(rand, 1);
  console.log(indexArray);
  // Creates the answer section of the game board, styles it, and appends each answer to that section.
  var answerSectionEl = document.createElement("section");
  answerSectionEl.setAttribute("id", "answer-section");
  answerSectionEl.style.display = "flex";
  answerSectionEl.style.flexWrap = "wrap";
  answerSectionEl.style.width = "100%";
  answerSectionEl.style.height = "50%";

  // Grabs the answer set paired to the question and adds them to the game board.
  var specificAnswers = answerArray[index];
  for (i = 0; i < 4; i++) {
    var eachAnswer = specificAnswers[i];
    var eachAnswerEl = document.createElement("p");
    eachAnswerEl.textContent = eachAnswer;

    eachAnswerEl.setAttribute("data-answer-id", i);
    eachAnswerEl.style.flexBasis = "45%";
    eachAnswerEl.style.flexGrow = "1";
    eachAnswerEl.style.flexShrink = "1";
    eachAnswerEl.style.textAlign = "center";
    eachAnswerEl.style.paddingTop = "20px";
    eachAnswerEl.style.verticalAlign = "center";
    eachAnswerEl.style.border = "4px solid lightgrey";
    eachAnswerEl.style.backgroundColor = "#FDFD96";
    answerSectionEl.append(eachAnswerEl);
  }
  gameBoardEl.append(answerSectionEl);
  hasChosen = false;
}
// tracks for users clicks, if user selects an answer element, haven't selected an answer element before while this question was displayed, then the answer choice is updated to display if the answer was correct. Time is updated and the next page is loaded.
function answerSelection(event) {
  var selectAnswerEl = event.target.tagName;
  if (selectAnswerEl === "P") {
    var answerChoice = event.target.innerText;
    var answerChoiceID = event.target.getAttribute("data-answer-ID");
    if (!hasChosen) {
      if (answerKeyArray.includes(answerChoice)) {
        var correctAnswerChoice = document.querySelector(
          "[data-answer-ID=" + CSS.escape(answerChoiceID) + "]"
        );
        correctAnswerChoice.style.backgroundColor = "#b8d8be";
        hasChosen = true;
        setTimeout(nextPage, 1000);
      } else {
        var incorrectAnswerChoice = document.querySelector(
          "[data-answer-ID=" + CSS.escape(answerChoiceID) + "]"
        );
        incorrectAnswerChoice.style.backgroundColor = "#FF6961";
        hasChosen = true;
        timeLeft -= 20;
        setTimeout(nextPage, 1000);
      }
      questionAnswered++;
    }
  }
}

// If the quiz hasnt been finished then the next question is displayed. If quiz is finished, the user is directed to post-quiz page.
function nextPage() {
  document.querySelector("#answer-section").remove();
  if (questionAnswered < 10) {
    displayQuestion();
  } else {
    quizEnd();
  }
}

// User score is reported and they are given the option to store their score.
function quizEnd() {
  clearInterval(timeInterval);
  questionTextEl.textContent =
    "The quiz has finished! Your score is " +
    timeLeft +
    "! Good job! To submit your score to the highscore list, enter your username below.";
  timerEl.remove();
  var scoreSubmissionEl = document.createElement("form");
  scoreSubmissionEl.style.marginBottom = "5vh";
  scoreSubmissionEl.style.display = "flex";
  scoreSubmissionEl.style.flexDirection = "column";
  scoreSubmissionEl.style.alignItems = "center";

  var labelEl = document.createElement("label");
  labelEl.setAttribute("for", "username");
  labelEl.textContent = "Username: ";

  var usernameEl = document.createElement("input");
  usernameEl.setAttribute("type", "text");
  usernameEl.setAttribute("name", "Username");
  usernameEl.setAttribute("id", "username");
  usernameEl.setAttribute("placeholder", "Your name here!");

  var submitName = document.createElement("button");
  submitName.textContent = "Submit!";
  submitName.setAttribute("class", "submit-btn");

  scoreSubmissionEl.append(labelEl);
  scoreSubmissionEl.append(usernameEl);
  scoreSubmissionEl.append(submitName);
  gameBoardEl.append(scoreSubmissionEl);
}

startBtnEl.addEventListener("click", startGame);

document.addEventListener("click", answerSelection);

// If user submits score and username then they are automatically directed to the high scores page.
gameBoardEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.className == "submit-btn") {
    var usernameInput = document.querySelector("#username");
    if (usernameInput.value !== "") {
      var user = [usernameInput.value, timeLeft];
      localStorage.setItem("newQuizUser", JSON.stringify(user));
      usernameInput.value = "";
      window.location.href = "./highscores.html";
    } else {
        alert("Please enter a username or pseudoname!");
    }
  }
});
