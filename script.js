var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
];

var questionEl = document.querySelector("#question");
var optionEl = document.querySelector("#option-list");
var ResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var body = document.querySelector("#body");

var answers;
var overalltimer = 16;
var timer = 5;
var questionIndex = 0;
var Count = 0;





function showquestion() {
    if (overalltimer == 0) {
        quiztimer();
        return;
    }

    var intervalId = setInterval(quiztimer, 1500);
    questionEl.textContent = questions[questionIndex].question;
    var choice = questions[questionIndex].choices;
    optionEl.innerHTML = "";
    ResultEl.innerHTML = "";

    for (i = 0; i < choice.length; i++) {
        var listitems = document.createElement("li");
        listitems.textContent = choice[i];
        optionEl.append(listitems);

    }
}
function next() {
    questionIndex++;

    if (questionIndex === questions.length) {
        overalltimer = 0;
    }
    showquestion();
}

optionEl.addEventListener("click", userchoice);

function userchoice() {
    if (event.target.matches("li")) { //in this line and in line 47 i did look at the code that we did in class
        answers = event.target.textContent;//because i was not able to get the right answer to say correct. 
        if (answers === questions[questionIndex].answer) { //the funtion went directly to the else statement
            ResultEl.textContent = "correct"
            Count++;
        }
        else {
            ResultEl.textContent = "incorrect, -5 seconds"
            overalltimer = overalltimer - 5;
            timerEl.textContent = overalltimer;
        }
        setTimeout(next, 1000);

    }
} showquestion();

function quiztimer() {
    overalltimer--;
    timerEl.textContent = overalltimer;
    if (overalltimer <= 0) {
        
         document.body.innerHTML = "you have scored; " + Count;
         setTimeout(highscore, 2);

    }
}




function highscore() {
    var name = prompt("pleae enter your name ");

    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: Count });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });
    if(contentLI>10){
        localStorage.clear();
    }
    var contentUL = document.createElement("ul");

    for (var i = 10; i > high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }
  
    document.body.appendChild(contentUL);
}




