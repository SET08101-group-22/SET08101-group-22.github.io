// question-pools.js - Store all quiz questions separated by quiz, each
// question has a structure with the question text, possible options, correct answer,
// and question type

// Cricket Quiz (Hamzah's quiz) - already implemented in your original script
const cricketQuestions = [
    {
        question: "Who won the ICC Cricket World Cup 2019?",
        options: ["India", "Australia", "England", "New Zealand"],
        correct: "England",
        type: "multiple-choice"
    },
    {
        question: "Which cricketer is nicknamed The Wall?",
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
        correct: "Babar Azam",
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
];

// space quiz - ALAN
const spaceExplorationQuestions = [
    {
        question: "Who was the first person to walk on the Moon?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
        correct: "Neil Armstrong",
        type: "multiple-choice"
    },
    {
        question: "What was the name of the first artificial satellite launched into space?",
        options: ["Apollo 11", "Sputnik 1", "Voyager 1", "Luna 2"],
        correct: "Sputnik 1",
        type: "multiple-choice"
    },
    {
        question: "Which planet is known for its prominent ring system?",
        options: ["Jupiter", "Uranus", "Saturn", "Neptune"],
        correct: "Saturn",
        type: "multiple-choice"
    },
    {
        question: "Which space telescope has provided stunning images of deep space since 1990?",
        options: ["James Webb Telescope", "Kepler Telescope", "Chandra Telescope", "Hubble Space Telescope"],
        correct: "Hubble Space Telescope",
        type: "multiple-choice"
    },
    {
        question: "Which rover successfully landed on Mars in 2021?",
        options: ["Curiosity", "Spirit", "Opportunity", "Perseverance"],
        correct: "Perseverance",
        type: "multiple-choice"
    },
    {
        question: "Which country was the first to send a human into space?",
        options: ["United States", "Russia", "China", "Germany"],
        correct: "Russia",
        type: "multiple-choice"
    },
    {
        question: "What is the name of NASA's program to return humans to the Moon?",
        options: ["Apollo", "Gemini", "Orion", "Artemis"],
        correct: "Artemis",
        type: "multiple-choice"
    },
    {
        question: "Which spacecraft is the farthest human-made object from Earth?",
        options: ["Pioneer 10", "Voyager 1", "Voyager 2", "New Horizons"],
        correct: "Voyager 1",
        type: "multiple-choice"
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correct: "Mercury",
        type: "multiple-choice"
    },
    {
        question: "What is the International Space Station (ISS) mainly used for?",
        options: ["Space tourism", "Military operations", "Scientific research", "Mining asteroids"],
        correct: "Scientific research",
        type: "multiple-choice"
    }
];


// History Quiz (Example for Quiz 3)
const historyQuestions = [
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correct: "George Washington",
        type: "multiple-choice"
    },
    {
        question: "In what year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: "1945",
        type: "multiple-choice"
    },
    {
        question: "Who was the first person to walk on the Moon?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
        correct: "Neil Armstrong",
        type: "multiple-choice"
    },
    {
        question: "Which civilization built the Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correct: "Inca",
        type: "multiple-choice"
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1910", "1912", "1914", "1916"],
        correct: "1912",
        type: "multiple-choice"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: "Leonardo da Vinci",
        type: "multiple-choice"
    },
    {
        question: "Which country was once ruled by the Romanov dynasty?",
        options: ["France", "Germany", "Russia", "Italy"],
        correct: "Russia",
        type: "multiple-choice"
    },
    {
        question: "The Great Wall of China was primarily built to defend against whom?",
        options: ["Mongols", "Japanese", "Russians", "Vietnamese"],
        correct: "Mongols",
        type: "multiple-choice"
    },
    {
        question: "Which ancient wonder of the world was located in Alexandria, Egypt?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse (Pharos)", "Temple of Artemis"],
        correct: "Lighthouse (Pharos)",
        type: "multiple-choice"
    },
    {
        question: "Who wrote 'The Communist Manifesto'?",
        options: ["Lenin", "Stalin", "Marx and Engels", "Trotsky"],
        correct: "Marx and Engels",
        type: "multiple-choice"
    }
];

// General Knowledge quiz (Example for Quiz 4) ZAINAB
const generalKnowledgeQuestions = [
    {
        question: "What is 5 + 2?",
        options: ["3", "7", "10", "8"],
        correct: "7",
        type: "multiple-choice"
    },
    {
        question: "Which of these is a Marvel superhero?",
        options: ["Superman", "Iron Man", "Wonder Woman", "Batman"],
        correct: "Iron Man",
        type: "multiple-choice"
    },
    {
        question: "What color is the sky during a clear day?",
        options: ["Pink", "Blue", "Green", "Red"],
        correct: "Blue",
        type: "multiple-choice"
    },
    {
        question: "In which country are the pyramids and the river Nile located?",
        options: ["Morocco", "Egypt", "Sudan", "Kenya"],
        correct: "Egypt",
        type: "multiple-choice"
    },
    {
        question: "Which musical features the characters Glinda and Elphaba?",
        options: ["Hairspray", "Mean Girls", "Wicked", "Hamilton"],
        correct: "Wicked",
        type: "multiple-choice"
    },
    {
        question: "Which of these cities is a capital city?",
        options: ["Glasgow", "Ottawa", "Rio de Janeiro", "Barcelona"],
        correct: "Ottawa",
        type: "multiple-choice"
    },
    {
        question: "Which artist released the song '7 Rings'?",
        options: ["Ariana Grande", "Taylor Swift", "Selena Gomez", "Dua Lipa"],
        correct: "Ariana Grande",
        type: "multiple-choice"
    },
    {
        question: "What is 5 x 6?",
        options: ["11", "25", "30", "36"],
        correct: "30",
        type: "multiple-choice"
    },
    {
        question: "What is the most common allergy in the world?",
        options: ["Nuts", "Hayfever", "Lactose", "Wheat"],
        correct: "Hayfever",
        type: "multiple-choice"
    },
    {
        question: "Which of the following is a valid human blood type?",
        options: ["BB", "AB", "C", "D"],
        correct: "AB",
        type: "multiple-choice"
    }
];

// Programming Quiz (Replacing the old Music Quiz) KIPRAS
const programmingQuestions = [
    {
        question: "What is the correct file extension for Python files?",
        options: [".pyth", ".pt", ".py", ".pyt"],
        correct: ".py",
        type: "multiple-choice"
    },
    {
        question: "Which symbol is used to end a statement in C++?",
        options: [",", ";", ".", ":"],
        correct: ";",
        type: "multiple-choice"
    },
    {
        question: "How do you insert COMMENTS in Python code?",
        options: ["// this is a comment", "<!-- this is a comment -->", "# this is a comment", "** this is a comment **"],
        correct: "# this is a comment",
        type: "multiple-choice"
    },
    {
        question: "How do you take input from the user in C++?",
        options: ["print()", "input()", "cin >>", "cout >>"],
        correct: "cin >>",
        type: "multiple-choice"
    },
    {
        question: "What is the starting point of a C++ program?",
        options: ["start() function", "main() function", "begin() function", "first() function"],
        correct: "main() function",
        type: "multiple-choice"
    },
    {
        question: "Which symbol is used to assign a value to a variable in Python?",
        options: ["=", "==", ":", "->"],
        correct: "=",
        type: "multiple-choice"
    },
    {
        question: "What does #include do in C++?",
        options: ["Deletes a file", "Adds a library to the program", "Comments out code", "Prints something on the screen"],
        correct: "Adds a library to the program",
        type: "multiple-choice"
    },
    {
        question: "Which function is used to display output in Python?",
        options: ["input()", "echo()", "display()", "print()"],
        correct: "print()",
        type: "multiple-choice"
    },
    {
        question: "Which of the following is a correct way to declare a string variable in C++?",
        options: ["string name;", "String name;", "str name;", "text name;"],
        correct: "string name;",
        type: "multiple-choice"
    },
    {
        question: "What is the correct extension of C++ files?",
        options: [".cp", ".c", ".cpp", ".ccp"],
        correct: ".cpp",
        type: "multiple-choice"
    }
];

// Make all question sets available through a single object for easy access
// This allows the main script to access any quiz by its ID
const allQuizQuestions = {
    quiz1: cricketQuestions,
    quiz2: spaceExplorationQuestions,
    quiz3: historyQuestions,
    quiz4: generalKnowledgeQuestions,
    quiz5: programmingQuestions
};
