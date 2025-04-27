// script.js - Main application logic for the quiz functionality

// Define timer settings for each difficulty level (in seconds)
const difficultySettings = {
    easy: 45,    // 45 seconds per question for easy mode
    medium: 30,  // 30 seconds per question for medium mode
    hard: 15     // 15 seconds per question for hard mode
};

// Array to store the questions for the current quiz
let quizQuestions = [];

// Global variables to track quiz state
let questionIndex = 0;      // Current question index
let userAnswer = "";        // Stores the user's selected answer
let userScore = 0;          // Tracks the user's score
let timerInterval;          // Reference to the timer interval
let timeLeft = 30;          // Default time remaining for current question
// Track which power-ups have been used during the current quiz
let powerUpsUsed = {
    fiftyFifty: false,
    skip: false,
    extraTime: false
};

// Get saved difficulty and quiz selection from localStorage (default to medium and quiz1 if not found)
let selectedDifficulty = localStorage.getItem('selectedDifficulty') || 'medium';
let selectedQuiz = localStorage.getItem('selectedQuiz') || 'quiz1';
// Set initial time based on difficulty
let initialTimePerQuestion = difficultySettings[selectedDifficulty];

// Initialize the quiz when the page loads
window.onload = function() {
    loadQuestionsForSelectedQuiz();
    // Update the displayed difficulty level with proper capitalization
    document.getElementById("current-difficulty").textContent =
        selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    updateQuizTitle();
    timeLeft = initialTimePerQuestion;
    loadQuestion();
    startTimer();
    setupPowerUps();
    updateScoreDisplay();
};

// Load questions for the selected quiz from the question pools
function loadQuestionsForSelectedQuiz() {
    // Get the questions for the selected quiz or default to quiz1 if not found
    quizQuestions = allQuizQuestions[selectedQuiz] || allQuizQuestions.quiz1;
    // Reset to first question and clear score
    questionIndex = 0;
    userScore = 0;
}

// Update the quiz title displayed at the top of the page
function updateQuizTitle() {
    const quizTitles = {
        quiz1: "Cricket Quiz",
        quiz2: "Space Exploration Quiz",
        quiz3: "History Quiz",
        quiz4: "General Knowledge Quiz",
        quiz5: "Programming Quiz"
    };
    document.querySelector("header h1").textContent = quizTitles[selectedQuiz] || "Quiz";
}

// Load question content into the appropriate template
function loadQuestion() {
    resetTimer();

    // Update the question text
    const questionText = document.querySelector(".question-text");
    questionText.textContent = quizQuestions[questionIndex].question;

    // Always show multiple-choice template (could be expanded to handle other question types)
    document.querySelector(".multiple-choice").style.display = "block";

    // Update the answer options
    const options = quizQuestions[questionIndex].options;
    const optionLabels = document.querySelectorAll(".multiple-choice .option-label");

    // Update each option with the correct text and reset its state
    for (let i = 0; i < optionLabels.length; i++) {
        optionLabels[i].textContent = options[i];
        const input = document.querySelector(`#option${i + 1}`);
        if (input) {
            input.checked = false; // Uncheck any previous selections
        }
        // Reset option visibility (might have been affected by 50/50 power-up)
        const optionDiv = optionLabels[i].closest('.option');
        optionDiv.style.opacity = "1";
        optionDiv.style.pointerEvents = "auto";
    }

    // Reset user answer for new question
    userAnswer = "";
    // Refresh power-ups display to show which ones are still available
    resetPowerUpsDisplay();
    // Update score and question counter
    updateScoreDisplay();
}

// TIMER FUNCTIONS - Implemented by Lewis

// Start the countdown timer for the current question
function startTimer() {
    timeLeft = initialTimePerQuestion;
    updateTimerDisplay();
    // Clear any existing timer
    clearInterval(timerInterval);
    // Start a new timer that decrements every second
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        // When time runs out, handle as if timer expired
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Update the visual timer display with current time and color coding
function updateTimerDisplay() {
    // Update the numeric display
    document.querySelector(".timer-text").textContent = timeLeft;
    // Calculate and update the fill level of the timer
    const percentageLeft = (timeLeft / initialTimePerQuestion) * 100;
    document.querySelector(".timer-fill").style.height = `${percentageLeft}%`;

    // Define thresholds for color changes
    const lowTimeThreshold = initialTimePerQuestion * 0.2;  // 20% of time left (red)
    const mediumTimeThreshold = initialTimePerQuestion * 0.4;  // 40% of time left (orange)

    // Change colors based on time remaining
    if (timeLeft <= lowTimeThreshold) {
        document.querySelector(".timer").style.borderColor = "#ff4d4d";
        document.querySelector(".timer-fill").style.backgroundColor = "#ff4d4d";
    } else if (timeLeft <= mediumTimeThreshold) {
        document.querySelector(".timer").style.borderColor = "#ffa64d";
        document.querySelector(".timer-fill").style.backgroundColor = "#ffa64d";
    } else {
        document.querySelector(".timer").style.borderColor = "#4CAF50";
        document.querySelector(".timer-fill").style.backgroundColor = "#4CAF50";
    }
}

// Reset and restart the timer (used when loading a new question)
function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

// Handle case when the timer reaches zero
function handleTimeOut() {
    // Check if any answer was selected before time ran out
    checkAnswer(userAnswer);
    // Move to the next question
    moveToNextQuestion();
}

// Update the score and question counter display
function updateScoreDisplay() {
    document.getElementById("current-score").textContent = userScore;
    document.getElementById("question-number").textContent = questionIndex + 1;
    document.getElementById("total-questions").textContent = quizQuestions.length;
}

// Process the user's answer when submitted
function processAnswer() {
    const selectedOption = document.querySelector('.multiple-choice input:checked');
    const feedback = document.getElementById("feedback");

    if (selectedOption) {
        // Get the text of the selected option
        userAnswer = selectedOption.nextElementSibling.textContent;

        // Check if answer is correct and update score/feedback
        if (userAnswer === quizQuestions[questionIndex].correct) {
            userScore += 1;
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = `Wrong! The correct answer was "${quizQuestions[questionIndex].correct}".`;
            feedback.style.color = "red";
        }

        // Wait 1.5 seconds to show feedback before moving to next question
        setTimeout(() => {
            feedback.textContent = "";
            moveToNextQuestion();
        }, 1500);
    } else {
        // Alert if no answer was selected
        alert("Please select an answer first!");
    }
}

// Check if provided answer matches the correct answer
function checkAnswer(userAnswer) {
    if (userAnswer === quizQuestions[questionIndex].correct) {
        userScore += 1;
    }
}

// Move to the next question or end the quiz if all questions are answered
function moveToNextQuestion() {
    if (questionIndex < quizQuestions.length - 1) {
        // Move to next question
        questionIndex++;
        loadQuestion();
    } else {
        // End quiz if all questions are answered
        endQuiz();
    }
}

// End the quiz and save scores
function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
    const total = quizQuestions.length;

    // Format quiz title for use in localStorage keys (replace spaces with underscores)
    const quizTitle = document.querySelector("header h1").textContent.trim().replace(/\s+/g, "_").toLowerCase();

    // Save most recent score
    localStorage.setItem(`${quizTitle}_last`, userScore);
    // Update personal best if current score is higher
    const previousBest = localStorage.getItem(`${quizTitle}_best`) || 0;
    if (userScore > previousBest) {
        localStorage.setItem(`${quizTitle}_best`, userScore);
    }

    // Redirect to results page with score and total in URL parameters
    window.location.href = `result.html?score=${userScore}&total=${total}`;
}

// Save detailed score data (top scores, history)
function saveScore() {
    // Get existing scores or initialize empty object
    const quizScores = JSON.parse(localStorage.getItem("quizScores")) || {};
    const quizTitle = document.querySelector("header h1").textContent;
    quizScores[quizTitle] = quizScores[quizTitle] || [];

    // Add current score with timestamp
    quizScores[quizTitle].push({
        score: userScore,
        date: new Date().toISOString()
    });

    // Sort scores from highest to lowest
    quizScores[quizTitle].sort((a, b) => b.score - a.score);

    // Keep only the top 5 scores
    if (quizScores[quizTitle].length > 5) {
        quizScores[quizTitle] = quizScores[quizTitle].slice(0, 5);
    }

    // Save updated scores back to localStorage
    localStorage.setItem("quizScores", JSON.stringify(quizScores));
}

// Restart the quiz (reset all state)
function restartQuiz() {
    // Reset question index and score
    questionIndex = 0;
    userScore = 0;
    userAnswer = "";

    // Reset power-ups
    powerUpsUsed = {
        fiftyFifty: false,
        skip: false,
        extraTime: false
    };

    // Remove results display and show quiz UI
    document.querySelector(".results").remove();
    document.querySelector(".question-container").style.display = "block";
    document.querySelector(".controls").style.display = "block";
    document.querySelector(".power-up-panel").style.display = "flex";
    document.querySelector(".timer-container").style.display = "block";

    // Load first question
    loadQuestion();
}

// POWER-UPS SETUP - Implemented by Alan

// setup the power-up buttons with event listeners and modal interactions
// - alan
function setupPowerUps() {
    // setup event listener for the 50/50 power-up button
    document.getElementById("fifty-fifty").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.fiftyFifty) {
            showPowerUpConfirmation("fifty-fifty", "50/50", use5050PowerUp);
        }
    });

    // setup event listener for the skip question power-up button
    document.getElementById("skip").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.skip) {
            showPowerUpConfirmation("skip", "Skip Question", useSkipPowerUp);
        }
    });

    // setup event listener for the extra time power-up button
    document.getElementById("extra-time").querySelector("button").addEventListener("click", function() {
        if (!powerUpsUsed.extraTime) {
            showPowerUpConfirmation("extra-time", "Extra Time", useExtraTimePowerUp);
        }
    });

    // setup modal cancel button
    document.querySelector(".cancel-btn").addEventListener("click", hidePowerUpConfirmation);

    // setup submit answer button
    document.querySelector(".submit-btn").addEventListener("click", processAnswer);
}

// show the confirmation modal when a power-up is clicked
// the modal asks the user to confirm before using a power-up
// - alan
function showPowerUpConfirmation(powerUpId, powerUpName, confirmCallback) {
    const modal = document.getElementById("power-up-modal");
    document.getElementById("power-up-name").textContent = powerUpName;

    // set the confirm button to execute the appropriate power-up function
    document.querySelector(".confirm-btn").onclick = function() {
        confirmCallback();
        hidePowerUpConfirmation();
    };

    // display the modal
    modal.style.display = "flex";
}

// hide the power-up confirmation modal
// - alan
function hidePowerUpConfirmation() {
    document.getElementById("power-up-modal").style.display = "none";
}

// update the display of power-up buttons to show which ones have been used
// - alan
function resetPowerUpsDisplay() {
    Object.keys(powerUpsUsed).forEach(powerUp => {
        const button = document.getElementById(convertToDashCase(powerUp));
        if (powerUpsUsed[powerUp]) {
            button.classList.add("power-up-disabled");
            button.querySelector("button").disabled = true;
        }
    });
}

// convert camelCase to dash-case for DOM element IDs
// e.g., fiftyFifty becomes fifty-fifty
// - alan
function convertToDashCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// 50/50 POWER-UP IMPLEMENTATION
// removes two incorrect options, leaving the correct answer and one wrong answer
// - alan
function use5050PowerUp() {
    // mark the power-up as used so it can't be used again in this quiz
    powerUpsUsed.fiftyFifty = true;

    // update button appearance to show it's been used
    const button = document.getElementById("fifty-fifty");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // get the correct answer and all option elements
    const correctAnswer = quizQuestions[questionIndex].correct;
    const options = document.querySelectorAll(".multiple-choice .option");
    const optionLabels = document.querySelectorAll(".multiple-choice .option-label");

    // collect all incorrect options
    const incorrectOptions = [];
    for (let i = 0; i < optionLabels.length; i++) {
        if (optionLabels[i].textContent !== correctAnswer) {
            incorrectOptions.push(options[i]);
        }
    }

    // shuffle the incorrect options and select two to hide
    shuffleArray(incorrectOptions);
    const optionsToHide = incorrectOptions.slice(0, 2);

    // hide the selected incorrect options
    optionsToHide.forEach(option => {
        option.style.opacity = "0.3";
        option.style.pointerEvents = "none";
        const input = option.querySelector("input");
        if (input) {
            input.checked = false;
        }
    });
}

// SKIP QUESTION POWER-UP IMPLEMENTATION
// allows user to skip the current question without gaining or losing points
// - alan
function useSkipPowerUp() {
    // mark the power-up as used
    powerUpsUsed.skip = true;

    // update button appearance
    const button = document.getElementById("skip");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // move to the next question
    moveToNextQuestion();
}

// EXTRA TIME POWER-UP IMPLEMENTATION
// adds 15 seconds to the current question's timer
// - alan
function useExtraTimePowerUp() {
    // mark the power-up as used
    powerUpsUsed.extraTime = true;

    // update button appearance
    const button = document.getElementById("extra-time");
    button.classList.add("power-up-disabled");
    button.querySelector("button").disabled = true;

    // add 15 seconds to the timer
    timeLeft += 15;
    updateTimerDisplay();
}

// Utility function to shuffle an array using Fisher-Yates algorithm
// used for randomizing which incorrect answers to hide in 50/50 power-up
// - alan
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}