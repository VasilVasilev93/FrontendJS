function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
}


function generateStatus(status, wordToGuess)
{
    for(var i = 0; i < wordToGuess.length; i++)
    {
        status += "_";
    }

    return status;
}

function gameEnd(word)
{
    console.log("You have guessed the word!");
    console.log(word);
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function checkIfGuessUsed(guess)
{
    var currentGuesses = usedGuesses;
    for(var i = 0; i < usedGuesses.length; i++)
    {
        if(guess === usedGuesses[i])
        {
            console.log("You have already tried " + guess + ".");
            console.log("Here is list of your trials: " + usedGuesses);
            return false;
        }
    }

    if(currentGuesses === usedGuesses)
    {
        usedGuesses += guess;
        console.log(usedGuesses);
        return true;
    }
}

function isGuessValid(guess) 
{
    if(!isNaN(guess))
    {
        console.log("Please enter alphabet/word!")
        return false;
    }

    return true;
}

function checkGuess(guess, wordToGuess)
{
    if(!isGuessValid(guess)) return false;

    if(!(checkIfGuessUsed(guess))) return false;

    if(guess === wordToGuess)
    {
        status = wordToGuess;
        gameEnd(status);
        return true;
    }
    else
    {
        var oldStatus = status;

        for(var i = 0; i < wordToGuess.length; i++)
        {
            if(guess === wordToGuess[i])
            {
                status = status.replaceAt(i, guess);

                if(status === wordToGuess)
                {
                    gameEnd(status);
                    return true;
                }
                else
                {
                    console.log("Good!");
                    console.log(status);
                }
            }
        }

        if(status === oldStatus)
        {
            console.log("You got " + parseInt(eCounter + 1) + " of all 5 warnings! There is no " + guess + "-s");
            eCounter++;
            return false;
        }
    }
}

function promptGuess()
{
    prompt.get(['guess'], function (err, result)
    {
        if(eCounter < 4)
        {
            if(checkGuess(result.guess, hangWord)) return true;
            else promptGuess();
        }

        else
        {
            console.log("You lost! Before you get hanged, you can see the word that killed you. It's " + "'" + hangWord + "'" + ". Goodbye :)");
            return false;
        }
    })
}


var words = ["crocodile", "hangman", "bicycle", "monkey", "literature"];
var hangWord = words[getRandomInt(0, words.length)];
var status = "";
var usedGuesses = "";

status = generateStatus(status, hangWord);

console.log("You have word with " + status.length + " symbols. Thats your current status " + status);

var eCounter = 0;

var prompt = require('prompt');

promptGuess();