var amountCorrect = 0;
var amountWrong = 0;
var unanswered = 0;
var number = 0;
var questions = [];
var time = 7;

questions[0] = {
    question: "What is pikachu's last evolution?",
    answers: ["Raichu", "Pichu", "Pika Pika", "Electrode"],
    correctIndex: 0,
};

questions[1] = {
    question: "Who is Ash's main pokemon?",
    answers: ["Bulbasaur", "Squirtle", "Pikachu", "Charmander"],
    correctIndex: 2,
};

questions[2] = {
    question: "What is the name of the talking cat in pokemon?",
    answers: ["wobbuffet", "Meowth", "Victreebel", "Magikarp"],
    correctIndex: 1,
};

questions[3] = {
    question: "If you're facing a Magmar in battle, which of these attacks should your Pokemon use?",
    answers: ["Hyper Beam", "Earthquake", "Splash", "Solar Beam"],
    correctIndex: 1,
};



$(document).ready(function() {


    startScreen();
    $("#correctpic").hide();
    $("#incorrectpic").hide();
    $("#outoftimepic").hide();



    function startScreen() {
        number = 0;
        $("#display").html("<div id='start-screen'><div id='start'>Start</div></div>");
        $("#start").on("click", function() {
            questionsScreen();
            amountCorrect = 0;
            amountWrong = 0;
            unanswered = 0;
        });
    };

    function correctScreen() {
        $("#display").html("<div class='transitions'>Got To Catch Them All!</div>");
        transition();
    };

    function incorrectScreen() {
        $("#display").html("<div class='transitions'>No Sir!</div><div class='transitions'>The Correct Answer was: <span id='actual-answer'></span></div>");
        transition();
        $("#actual-answer").html(actualAnswer)
    };

    function outOfTime() {
        $("#display").html("<div class='transitions'>Wake up!</div><div class='transitions'>The Correct Answer was: <span id='actual-answer'></span></div>");
        transition();
        $("#actual-answer").html(actualAnswer)
    };

    function questionsScreen() {
        $("#display").html("<div id='questions-screen'><div id='header'>Time remaining: <span id='time'>7</span></div><div id='question'></div><div id='container'></div></div>");
        generateQuestion();
        timer();
        $("#correctpic").hide();
        $("#incorrectpic").hide();
        $("#outoftimepic").hide();
    };

    function finalScreen() {
        $("#display").html("<div id='final-screen'><div id='final'>All done, here's how you did!</div><div>Correct Answers: <span id='correct'></span></div><div>Incorrect Answers: <span id='incorrect'></span></div><div>Unanswered: <span id='unanswered'></span></div><div id='high_score' class='high_score_background'>High score</div><div id='reset'>Start Over?</div></div>");
        $("#correct").html(amountCorrect);
        $("#incorrect").html(amountWrong);
        $("#unanswered").html(unanswered);
        $("#correctpic").hide();
        $("#incorrectpic").hide();
        $("#outoftimepic").hide();
        $("#reset").on("click", function() {
            startScreen();
        });
        $("#high_score").on("click",function(){
            var body =document.body;
            body.innerHTML = "Your Score " + amountCorrect +  resetinhigh();
        
            high_score();
           
        }
        )
    };
    var questionTime;

    function timer() {
        questionTime = setInterval(function() {
            time--;
            $("#time").html(time);
            if (time === 0) {
                unanswered++;
                number++;
                outOfTime();
                clearInterval(questionTime);
                time = 7;
                $("#outoftimepic").show();
            };
        }, 1000);
    };

    function transition() {
        var transitionTime = setTimeout(function() {
            if (number === 4) {
                finalScreen();
            } else {
                questionsScreen();
            };

        }, 3500);
    };

    var actualAnswer;

    function generateQuestion() {
        var correctLocation = questions[number].correctIndex;
        actualAnswer = questions[number].answers[correctLocation];
        $("#question").html(questions[number].question);
        for (var i = 0; i < 4; i++) {
            $("#container").append("<div class='selection' data-answer-index= " + i + ">" + questions[number].answers[i] + "</div>");
        }

        $("#container").on("click", ".selection", function() {
            clearInterval(questionTime);
            var answerIndex = ($(this).data("answer-index"));
            number++;



            if (answerIndex === correctLocation) {
                amountCorrect++;
                correctScreen();
                time = 7;
                $("#correctpic").show();

            } else {
                amountWrong++;
                incorrectScreen();
                time = 7;
                $("#incorrectpic").show();

            };

        });
    }
    
function resetinhigh(){
    $("#display").html("<div id='reset'>Start Over?</div><div id='clear'>clear highscores</div>")
    $("#reset").on("click", function() {
            startScreen();
        });
        $("#clear").on("click", function(){
            localStorage.clear();
        })
}
    function high_score(){
        var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: amountCorrect });

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
  
 
};

})