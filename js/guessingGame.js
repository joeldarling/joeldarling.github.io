//Joel Darling GuessingGame
/* **** Global Variables **** */

var winningNumber = generateWinningNumber(),
    guessesLeft = 5,
    guessHistory=[],gameOver=false;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber()
{

  return Math.floor(Math.random()*99) + 1;

}

// Fetch the Players Guess
function playersGuessSubmission()
{

  //Triggered when user presses SUBMIT or presess ENTER / RETURN

  //grab the current value from the input field
  var playersGuess=parseInt($('#guessInput').val());

  //check the answer!
  if(!isNaN(playersGuess) && gameOver == false)
    checkGuess(playersGuess);

}

// Check if the Player's Guess is the winning number
function checkGuess(guess)
{

  if(guess == winningNumber)
  {
    //we have a winner!
    gameOver = true;

    changeBackground("#f5f5f5");

    $('#guess-count').text("");
    //print Winner Message!
    $('#status').text("You are a WINNER!");
    $('.container').effect("bounce",1000);
  }
  else if(guess<1 || guess>100)
  {
    //out of range
    $('#status').text("You need to guess a number between 1 and 100!");
    $('#status').effect("bounce",500);
  }
  else if(checkGuessHistory(guessHistory,guess))
  {
    //player already guessed this!
    $('#status').text("You already guessed this number.");
    $('#status').effect("bounce",500);
  }
  else
  {
    //bad guess!

    //decrement guess counter
    guessesLeft--;

    //check for end of game
    if(guessesLeft==0)
    {
      //game over
      gameOver = true;

      //print guesses remaining
      $('#guess-count').text(guessesLeft + " Guesses Remaining");

      $('#status').text("You lose. Try again!");

      //change DOM to scaryness
      changeBackground("#1f1f1f");
      $("body").css("color", "red");
    }
    else
    {
      //new guess! add it to the list
      guessHistory.push(guess);

      //show the guess list
      $("#guess-list").css("display", "block");

      //update page with guess to guess List
      $('#guess-list').append("<p>"+guess+"</p>");

      //print guesses remaining
      $('#guess-count').text(guessesLeft + " Guesses Remaining");

      //update DOM with guess advice!
      $('#status').text(lowerOrHigher(guess));
    }
  }
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(guess)
{
  var guessProximity = Math.abs(guess-winningNumber);
  var result = "";

  //determin low or high
  if(guess < winningNumber)
  {
    result+="Your guess is lower ";
  }
  else {
    result+="Your guess is higher ";
  }

  //determine proximity
  if(guessProximity<=10){
    result+=" and you are within 10 digits!";
    changeBackground("#c84340");
  }
  else if(guessProximity>10 && guessProximity<20)
  {
    result+=" and you are within 20 digits!";
    changeBackground("#ee702c");
  }
  else{
    result+=" and you are more than 20 digits away!";
    changeBackground("#00ccff");
  }

  return result;
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint()
{
  var options=[];

  options.push(Math.floor(Math.random()*99) + 1);
  options.push(Math.floor(Math.random()*99) + 1);
  options.push(winningNumber);

  //add 3 possible numbers to the DOM
  $("#guess-list").css("display", "block");
  $('#guess-list').append("<p> ** Hint: "+options[0]+" or "+options[1]+" or "+options[2]+" **</p>");

}

function playAgain()
{
//Reset the game state!
gameOver = false;

//generate new winning Number
winningNumber = generateWinningNumber();

//reset Guesses remaining
guessesLeft = 5;

//print guesses remaining
$('#guess-count').text(guessesLeft + " Guesses Remaining");

//reset the Guess Display
$('#guess-list').find('p').empty();
$("#guess-list").css("display", "none");

//reset guesses array
guessHistory = [];

//reset colors
changeBackground("#00ccff");
$("body").css("color", "#332");

//reset input field
$('#guessInput').val("Enter a number 1-100");

//reset game feedback text
$('#status').text('');

}

function checkGuessHistory(arr, number)
{
  //a little helper function to search previously used answers
  for(var i=0;i<arr.length;i++)
  {
    if(arr[i] == number)
      return true;
  }

  //no match
  return false;
}


/* **** Event Listeners/Handlers ****  */

//listen for a keypress
$(document).keypress(function(key)
{
  switch(key.which)
  {
    case 13: //RETURN key
      playersGuessSubmission();
      break;
    case 104: //'h' key
      provideHint();
      break;
    case 114: //'r' key
      playAgain();
      break;
    default:
      break;
  }
});

function changeBackground(color)
{
  //change background color and animate
  $("body").animate({backgroundColor: color}, 500);

}
