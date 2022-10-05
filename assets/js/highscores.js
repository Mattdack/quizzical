var highscores = [];
var rankOrderEl = document.querySelector('#rank-order');

function init() {
    // check if highscores local storage has value. if it does highscores array = local storage array. It is null if the user hasn't submitted a score on this device.
    if(localStorage.getItem("highscores") !== null) {
        highscores = JSON.parse(localStorage.getItem("highscores"));
    }
   
    // check if there is a new score stored . if newscore push it to highscores array. It is null if the quiz has never been taken on this device
    var newUser = JSON.parse(localStorage.getItem('newQuizUser'));
    if(newUser !== null) {
        highscores.push(newUser);
    }
    // restore highscores array
    localStorage.setItem("highscores", JSON.stringify(highscores))
    // display the high scores
    displayScores();
}

function displayScores() {
    //sort array and return it in descending order.
    highscores.sort(function(a,b) {
        return b[1] - a[1];
    })
    //for loop that creates list elements for each array index and adds them to the page
    for(var i = 0; i < highscores.length; i++) {
        var liEl = document.createElement('li');
        var currentUser = highscores[i];
        liEl.textContent = currentUser[0] + " with " + currentUser[1] + " points!"
        rankOrderEl.append(liEl);
    }
}

init();