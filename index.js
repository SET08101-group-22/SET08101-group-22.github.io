// index.js - Handling the quiz selection page functionality

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Reference to form elements
    const difficultySelect = document.getElementById('difficulty');
    const quizSelect = document.getElementById('quiz');
    const startButton = document.getElementById('start-btn');
    const scoresButton = document.getElementById('scores-btn');

    // Load quiz options into the dropdown
    loadQuizOptions();

    // Initialize form selections from localStorage (if available)
    // This ensures the user's previous selections are remembered
    if (localStorage.getItem('selectedDifficulty')) {
        difficultySelect.value = localStorage.getItem('selectedDifficulty');
    }

    if (localStorage.getItem('selectedQuiz')) {
        quizSelect.value = localStorage.getItem('selectedQuiz');
    }

    // Add click event listener to the scores button
    // This navigates to the results page to view previous scores
    scoresButton.addEventListener('click', function() {
        window.location.href = 'result.html';
    });

    // Add click event listener to the start button
    // This saves selections and starts the quiz
    startButton.addEventListener('click', function() {
        // Get the selected difficulty and quiz
        const selectedDifficulty = difficultySelect.value;
        const selectedQuiz = quizSelect.value;

        // Store selections in localStorage for later use
        localStorage.setItem('selectedDifficulty', selectedDifficulty);
        localStorage.setItem('selectedQuiz', selectedQuiz);

        // Navigate to the quiz page
        window.location.href = 'quiz.html';
    });
});

// Function to populate the quiz options dropdown
function loadQuizOptions() {
    // Define quiz options with ID and display name
    // Each quiz is assigned to a different team member
    const quizzes = [
        { id: 'quiz1', name: 'Hamzah - Cricket Quiz' },
        { id: 'quiz2', name: 'Alan - Space Quiz' },
        { id: 'quiz3', name: 'History Quiz' },
        { id: 'quiz4', name: 'Zainab - General Knowledge Quiz' },
        { id: 'quiz5', name: 'Kipras - Programming Quiz' }
    ];

    const quizSelect = document.getElementById('quiz');

    // Add each quiz option to the select dropdown
    quizzes.forEach(quiz => {
        const option = document.createElement('option');
        option.value = quiz.id;
        option.textContent = quiz.name;
        quizSelect.appendChild(option);
    });
}