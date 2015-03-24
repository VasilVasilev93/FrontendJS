function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

function feedback(bulls, cows, number)
{
    console.log("You got " + bulls + " BULLS and " + cows + " COWS");
}

function isValid(answer)
{
    len = String(answer).length;
    if (len > 4 || len < 4)
    {
        console.log("Enter valid number!")   
        return false;
    }

    for(var i = 0; i < len-1; i++)
    {
        var substr = answer.substring(i+1, len)
        if(substr.indexOf(answer[i]) != -1)
        {
            console.log("Enter valid number!")
            return false;
        }
    }

    if(isNaN(answer))
    {
        console.log("Enter valid number!")
        return false;
    }
    return true;
}

function generateUnique()
{
    number = '';
    var len = 4;
    while (len > 0)
    {
        digit = getRandomInt(0, 9);
        
        if(number.indexOf(digit) === -1)
        {
            number += String(digit);
            len -= 1;
        }
    }
    return number;
}

function findCows(number, guess)
{
    for(var i = 0; i < number.length; i++)
    {
        for(var j = 0; j < number.length; j++)
        {
            if(i === j) continue;
            if(number.charAt(i) == guess.charAt(j))
            {
                cows++;
            }
        }
    }
    return cows;
}

function findBulls(number, guess)
{
    for(var i = 0; i<number.length; i++)
    {
        if(number.charAt(i) == guess.charAt(i))
        {
            bulls++;
        }
    }
    return bulls;
}


var number = generateUnique();
var prompt = require('prompt');
var bulls = 0,cows = 0;

console.log(String(number).length);
console.log(number);

function promptNumber()
{
    prompt.get(['answer'], function (err, result)
    {
        if(!isValid(result.answer))
        {
            promptNumber();
        }
        else
        {
            bulls = findBulls(number, result.answer);
            cows = findCows(number, result.answer);

            if(number.length === bulls) 
            {
                console.log("Success");   
                return true;
            }

            else (feedback(bulls, cows, number));
            
            bulls = 0;
            cows = 0;
            promptNumber();
        }
    })
}

promptNumber();
