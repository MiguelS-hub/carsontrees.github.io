var questions = [
    {
        question: "what is the capital of New Jersey",
        choices: ["New Jersey state","Trenton","Hackensack","Newark"],
        answer: "Trenton",
    },
    {
        question:
            "what is the capital of New York",
        choices: ["Albany","New York City","Brooklyn","Mexico"],
        answer: "Albany",
    },
    {
    question:
    "which is a fruit",
choices: ["Avocado","Kale","Carrots","Broccoli"],
answer: "Avocado",
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
var intervalId;




function showquestion() {
    if (overalltimer == 0) {
        quiztimer();
        return;
    }

     intervalId = setInterval(quiztimer, 1500);
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
    clearInterval(intervalId);
    if (event.target.matches("li")) { 
        if (answers === questions[questionIndex].answer) { 
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
   // overalltimer--;
    timerEl.textContent = overalltimer;
    if (overalltimer <= 0) {
        clearInterval(intervalId);
         document.body.innerHTML = "you have scored; " + Count;
         setTimeout(highscore, 2);

    }
}

function highscore (){
    var name = prompt("Please enter your name");

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
  
    var contentUL = document.createElement("ul");
  
    for (var i = 0; i < high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }
  
    document.body.appendChild(contentUL);
}







