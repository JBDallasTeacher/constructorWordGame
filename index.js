//// Constructor initialize
var Word = require("./Word.js");
var inquirer = require("inquirer");

// letters entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var mexicanStates = ["aguascalientes", "baja california norte", "baja california sur", "campeche", "chiapas", "chihuahua", "ciudad de méxico", "coahuila", "colima",
    "durango", "guanajuato", "guerrero", "hidalgo", "jalisco", "méxico", "michoacán", "morelos", "nayarit", "nuevo León", "oaxaca", "puebla",
    "querétaro", "quintana roo", "san luis potosí", "sinaloa", "sonora", "tabasco", "tamaulipas", "tlaxcala", "veracruz", "yucatán", " zacatecas"
];

// Pick Random index from MexicanStates array
var randomIndex = Math.floor(Math.random() * mexicanStates.length);
var randomWord = mexicanStates[randomIndex];

// Pass random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function logistics() {

    // Generates new word for Word constructor if true
    if (requireNewWord) {
        // Selects random MexicanStates array
        var randomIndex = Math.floor(Math.random() * mexicanStates.length);
        var randomWord = mexicanStates[randomIndex];

        // Passes random word through the Word constructor
        computerWord = new Word(randomWord);
        requireNewWord = false;
    }

    // TestS if a letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input", message: "Guess a letter between a-z -lowercase-!", name: "userinput"
                }
            ])
            .then(function (input) {

                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\n Please try again!\n");
                    logistics();
                } else {

                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or No Input\n");
                        logistics();
                    } else {

                        // Checks if guess is correct
                        var wordCheckArray = [];
                        computerWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nIncorrect\n");
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + correctLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            logistics();
                        } else {
                            console.log("Sorry, you lose!\n");
                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("YOU WIN!\n");
        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                logistics();
            } else {
                return;
            }
        });
}

logistics();