
 // logic.js

var currentQuestionIndex = 0;
var time = 60; 
var timerInterval;


var startButton = document.getElementById("start");
var questionsDiv = document.getElementById("questions");
var choicesDiv = document.getElementById("choices");
var timerSpan = document.getElementById("time");
var endScreenDiv = document.getElementById("end-screen");
var finalScoreSpan = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var score = parseInt(document.getElementById("final-score").textContent);


var questions = [
  {
    title: "What is the result of the following expression: 5 + '5'?",
    choices: ["55", "10", "Error", "25"],
    answer: "55"
  },
  {
    title: "Which method is used to add an element to the end of an array?",
    choices: ["push()", "append()", "addToEnd()", "insertLast()"],
    answer: "push()"
  },
  {
    title: "What does the '=== 'operator do in JavaScript?",
    choices: ["Compares values for equality and type", "Assigns a value to a variable", "Checks for a specific condition", "Performs bitwise comparison"],
    answer: "Compares values for equality and type"
  },
  {
    title: "Which of the following is not a JavaScript framework or library?",
    choices: ["React", "Angular", "Vue", "JavaFX"],
    answer: "JavaFX"
  }
];


function startQuiz() {
  startButton.style.display = "none";
  questionsDiv.classList.remove("hide");
  timerInterval = setInterval(function () {
    time--;
    timerSpan.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);

  showQuestion();
}


function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = currentQuestion.title;

 
  choicesDiv.innerHTML = "";

  
  currentQuestion.choices.forEach(function (choice) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", function () {
      checkAnswer(choice);
    });
    choicesDiv.appendChild(choiceButton);
  });
}


function checkAnswer(choice) {
  var currentQuestion = questions[currentQuestionIndex];

  if (choice === currentQuestion.answer) {
    
  } else {
    
    time -= 10;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}
function submitScore() {
  console.log("Submit button clicked");


  var initials = document.getElementById("initials").value.trim();
  console.log("Initials:", initials);

  var score = parseInt(document.getElementById("final-score").textContent);
  console.log("Score:", score);

  if (initials !== "") {
  
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

   
    highScores.push({ initials: initials, score: score });

  
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });

    console.log("Updated High Scores:", highScores);

    
    localStorage.setItem("highScores", JSON.stringify(highScores));

 
    window.location.href = "highscores.html";
  } else {
    alert("Please enter your initials before submitting.");
  }
}



function endQuiz() {
  clearInterval(timerInterval);
  questionsDiv.classList.add("hide");
  endScreenDiv.classList.remove("hide");
  finalScoreSpan.textContent = time;
}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", function () {
  submitScore();
});


