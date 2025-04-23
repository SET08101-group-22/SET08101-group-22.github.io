// quiz questions data
const quizQuestions = [
  // Hamzahs Cricket questions start here
  {
      question: "Who won the ICC Cricket World Cup 2019?",
      options: ["India", "Australia", "England", "New Zealand"],
      correct: "England",
      type: "multiple-choice"
  },
  {
      question: "Which cricketer is nicknamed “The Wall”?",
      options: ["Rahul Dravid", "Sachin Tendulkar", "Virat Kohli", "MS Dhoni"],
      correct: "Rahul Dravid",
      type: "multiple-choice"
  },
  {
      question: "Who holds the record for most Test wickets?",
      options: ["Muttiah Muralitharan", "Shane Warne", "Anil Kumble", "James Anderson"],
      correct: "Muttiah Muralitharan",
      type: "multiple-choice"
  },
  {
      question: "Which team has won the most ICC Cricket World Cups?",
      options: ["India", "West Indies", "Australia", "Pakistan"],
      correct: "Australia",
      type: "multiple-choice"
  },
  {
      question: "Who is the fastest player to 6,000 ODI runs?",
      options: ["Virat Kohli", "Babar Azam", "Ricky Ponting", "Jacques Kallis"],
      correct: "Virat Kohli",
      type: "multiple-choice"
  },
  {
      question: "Which country hosted the first Cricket World Cup (1975)?",
      options: ["India", "England", "Australia", "South Africa"],
      correct: "England",
      type: "multiple-choice"
  },
  {
      question: "Getting out for zero runs on the first ball faced is called a?",
      options: ["Golden duck", "No-score", "Run-out", "Zero run"],
      correct: "Golden duck",
      type: "multiple-choice"
  },
  {
      question: "Who is the only player with 100 international centuries?",
      options: ["Virat Kohli", "Ricky Ponting", "Brian Lara", "Sachin Tendulkar"],
      correct: "Sachin Tendulkar",
      type: "multiple-choice"
  },
  {
      question: "How many players are there on a cricket team?",
      options: ["9", "10", "11", "12"],
      correct: "11",
      type: "multiple-choice"
  },
  {
      question: "How many overs does each side bowl in a standard T20 match?",
      options: ["20", "50", "10", "15"],
      correct: "20",
      type: "multiple-choice"
  }
  // hamzahs  Cricket questions end here 
];


// global variables
let questionIndex = 0;
let userAnswer = "";
let userScore = 0;
let timerInterval;
let timeLeft = 30; // default time for questions in seconds
let powerUpsUsed = {
    fiftyFifty: false,
    skip: false,
    extraTime: false
};

// initialize when page loads
window.onload = function() {
    loadQuestion();
    startTimer();
    setupPowerUps();
    updateScoreDisplay();
};

// update the score display
function updateScoreDisplay() {
    document.getElementById("current-score").textContent = userScore;
    document.getElementById("question-number").textContent = questionIndex + 1;
    document.getElementById("total-questions").textContent = quizQuestions.length;
}

// load question content
function loadQuestion() {
    // reset timer for new question
    resetTimer();

    // update question text
    const questionText = document.querySelector(".question-text");
    questionText.textContent = quizQuestions[questionIndex].question;

    // for multiple choice questions
    if (quizQuestions[questionIndex].type === "multiple-choice") {
        // show multiple choice template, hide others
        document.querySelector(".multiple-choice").style.display = "block";
        document.querySelector(".true-false").style.display = "none";
        document.querySelector(".select-all").style.display = "none";

        // update options
        const options = quizQuestions[questionIndex].options;
        const optionLabels = document.querySelectorAll(".multiple-choice .option-label");

        for (let i = 0; i < optionLabels.length; i++) {
            optionLabels[i].textContent = options[i];

            // reset any previously selected options
            const input = document.querySelector(`#option${i+1}`);
            if (input) {
                input.checked = false;
            }

            // reset any styling from 50/50
            const optionDiv = optionLabels[i].closest('.option');
            optionDiv.style.opacity = "1";
            optionDiv.style.pointerEvents = "auto";
        }
    }

    // reset user answer
    userAnswer = "";

    // reset power-ups availability for new question if needed
    resetPowerUpsDisplay();

    // update score display
    updateScoreDisplay();
}

// timer functions
function startTimer() {
    timeLeft = 30; // reset to default time
    updateTimerDisplay();

    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();

        // handle time running out
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    // update timer text
    document.querySelector(".timer-text").textContent = timeLeft;

    // update timer fill visualization (represents time remaining)
    const percentageLeft = (timeLeft / 30) * 100;
    document.querySelector(".timer-fill").style.height = `${percentageLeft}%`;

    // change color based on time remaining
    if (timeLeft <= 5) {
        document.querySelector(".timer").style.borderColor = "#ff4d4d";
        document.querySelector(".timer-fill").style.backgroundColor = "#ff4d4d";
    } else if (timeLeft <= 10) {
        document.querySelector(".timer").style.borderColor = "#ffa64d";
        document.querySelector(".timer-fill").style.backgroundColor = "#ffa64d";
    } else {
        document.querySelector(".timer").style.borderColor = "#4CAF50";
        document.querySelector(".timer-fill").style.backgroundColor = "#4CAF50";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

function handleTimeOut() {
    // time ran out - auto move to next question
    checkAnswer(userAnswer);
    moveToNextQuestion();
}

// process user's answer
function processAnswer() {
  const selectedOption = document.querySelector('.multiple-choice input:checked');
  const feedback = document.getElementById("feedback");

  if (selectedOption) {
    userAnswer = selectedOption.nextElementSibling.textContent;

    if (userAnswer === quizQuestions[questionIndex].correct) {
      userScore += 1;
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Wrong! The correct answer was "${quizQuestions[questionIndex].correct}".`;
      feedback.style.color = "red";
    }

    setTimeout(() => {
      feedback.textContent = "";
      moveToNextQuestion();
    }, 1500); // show the user the correct answer for 1.5 seconds 
  } else {
    alert("Please select an answer first!");
  }
}

// check if answer is correct
function checkAnswer(userAnswer) {
    if (userAnswer === quizQuestions[questionIndex].correct) {
        userScore += 1;
    }
}

// move to next question or end quiz
function moveToNextQuestion() {
    if (questionIndex < quizQuestions.length - 1) {
        questionIndex++;
        loadQuestion();
    } else {
        // end of quiz
        endQuiz();
    }
}

function endQuiz() {
  clearInterval(timerInterval); // stop timer
  const total = quizQuestions.length;

  const quizTitle = document.querySelector("header h1").textContent.trim().replace(/\s+/g, "_").toLowerCase();

  localStorage.setItem(`${quizTitle}_last`, userScore);
  const previousBest = localStorage.getItem(`${quizTitle}_best`) || 0;
  if (userScore > previousBest) {
    localStorage.setItem(`${quizTitle}_best`, userScore);
  }

  window.location.href = `result.html?score=${userScore}&total=${total}`;
}



// save score to local storage
function saveScore() {
    const quizScores = JSON.parse(localStorage.getItem("quizScores")) || {};

    // use the quiz title as the key
    const quizTitle = document.querySelector("header h1").textContent;
    quizScores[quizTitle] = quizScores[quizTitle] || [];

    // add new score
    quizScores[quizTitle].push({
        score: userScore,
        date: new Date().toISOString()
    });

    // sort by score (highest first)
    quizScores[quizTitle].sort((a, b) => b.score - a.score);

    // keep only top 5 scores
    if (quizScores[quizTitle].length > 5) {
        quizScores[quizTitle] = quizScores[quizTitle].slice(0, 5);
    }

    // save back to local storage
    localStorage.setItem("quizScores", JSON.stringify(quizScores));
}

// restart the quiz
function restartQuiz() {
    questionIndex = 0;
    userScore = 0;
    userAnswer = "";

    // reset power-ups
    powerUpsUsed = {
        fiftyFifty: false,
        skip: false,
        extraTime: false
    };

    // remove results div
    document.querySelector(".results").remove();

    // show quiz elements again
    document.querySelector(".question-container").style.display = "block";
    document.querySelector(".controls").style.display = "block";
    document.querySelector(".power-up-panel").style.display = "flex";
    document.querySelector(".timer-container").style.display = "block";

    // load first question
    loadQuestion();
}

// =========== power-up system ===========

// setup power-up buttons
function setupPowerUps() {
    // 50/50 power-up
    document.getElementById("fifty-fifty").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.fiftyFifty) {
            showPowerUpConfirmation("fifty-fifty", "50/50", use5050PowerUp);
        }
    });

    // skip question power-up
    document.getElementById("skip").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.skip) {
            showPowerUpConfirmation("skip", "Skip Question", useSkipPowerUp);
        }
    });

    // extra time power-up
    document.getElementById("extra-time").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.extraTime) {
            showPowerUpConfirmation("extra-time", "Extra Time", useExtraTimePowerUp);
        }
    });

    // close modal buttons
    document.querySelector(".cancel-btn").addEventListener("click", hidePowerUpConfirmation);

    // submit answer button
    document.querySelector(".submit-btn").addEventListener("click", processAnswer);
}

// show power-up confirmation modal
function showPowerUpConfirmation(powerUpId, powerUpName, confirmCallback) {
    const modal = document.getElementById("power-up-modal");
    document.getElementById("power-up-name").textContent = powerUpName;

    // set confirm button action
    document.querySelector(".confirm-btn").onclick = function() {
        confirmCallback();
        hidePowerUpConfirmation();
    };

    // show modal
    modal.style.display = "flex";
}

// hide power-up confirmation modal
function hidePowerUpConfirmation() {
    document.getElementById("power-up-modal").style.display = "none";
}

// reset power-ups display
function resetPowerUpsDisplay() {
    // update power-up buttons based on usage
    Object.keys(powerUpsUsed).forEach(powerUp => {
        const button = document.getElementById(convertToDashCase(powerUp));

        if (powerUpsUsed[powerUp]) {
            // mark as used (disabled)
            button.classList.add("power-up-disabled");
            button.querySelector("button").disabled = true;
        }
    });
}

// helper function to convert camelCase to dash-case
function convertToDashCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// 50/50 power-up implementation
function use5050PowerUp() {
    powerUpsUsed.fiftyFifty = true;

    // disable the 50/50 button
    const button = document.getElementById("fifty-fifty");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // get correct answer
    const correctAnswer = quizQuestions[questionIndex].correct;

    // get all options
    const options = document.querySelectorAll(".multiple-choice .option");
    const optionLabels = document.querySelectorAll(".multiple-choice .option-label");

    // find incorrect options
    const incorrectOptions = [];

    for (let i = 0; i < optionLabels.length; i++) {
        if (optionLabels[i].textContent !== correctAnswer) {
            incorrectOptions.push(options[i]);
        }
    }

    // randomly select two incorrect options to hide
    shuffleArray(incorrectOptions);
    const optionsToHide = incorrectOptions.slice(0, 2);

    // hide selected incorrect options
    optionsToHide.forEach(option => {
        option.style.opacity = "0.3";
        option.style.pointerEvents = "none";
        // also uncheck if it was checked
        const input = option.querySelector("input");
        if (input) {
            input.checked = false;
        }
    });
}

// skip question power-up implementation
function useSkipPowerUp() {
    powerUpsUsed.skip = true;

    // disable the skip button
    const button = document.getElementById("skip");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // move to next question without checking answer or penalizing score
    moveToNextQuestion();
}

// extra time power-up implementation
function useExtraTimePowerUp() {
    powerUpsUsed.extraTime = true;

    // disable the extra time button
    const button = document.getElementById("extra-time");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // add extra time (15 seconds)
    timeLeft += 15;
    updateTimerDisplay();
}

// fisher-yates shuffle algorithm for arrays (shuffling for 50/50)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

