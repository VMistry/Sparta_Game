// This links to the div tags, enabling them to be accessed.
var clickableOBJ = $(".display");
// This will hold an array, which will be generated by computer, user would need to copy the combo correctly
var arraySequence;
// This will be an array which will hold user input.
var playerInsert;
// This will hold how many colors are flashed, this increases throughout the game.
var numberFlash = 1;
// This will hold the player number, e.g. player one or player 2.
var player = 0;
//This holds a boolean value saying if the user has made a mistake.
var errorFound = false;

//Start the game by creating the sequence.
createLevel();

//Look at if the button has been pressed or not.
clickableOBJ.on("mousedown", clickAction);

//This is used to create the squence for the level.
function createLevel(){
  //Reset the below variables.
  arraySequence = [];
  playerInsert = [];
  amountInsert = 0;
  //If its player 0 or 1, display player one and show its player ones turn.
  if(player != 2){
    //change to player 2
    player++;
    $('#updatingTXT1').text("Player " + player + "'s turn");
  }
  //If its player 2, display player two and show its player 2's turn.
  else{
    //change to player 1
    player--;
    //Display message saying its player ones turn.
    $('#updatingTXT1').text("Player " + player + "'s turn");
    //Increase the level.
    numberFlash++;
    //display what level it is.
    $('#updatingTXT2').text("Level " + numberFlash);
  }
  //Generate a pattern.
  createLevelPattern();
}

//Generate a pattern for the level
function createLevelPattern(){
  //Adds each element using Math.random and converting numbers in to colors.
  for (var i = 0; i < numberFlash; i++) {
    var generateNumber = Math.floor(Math.random() * 4 + 1);
    arraySequence.push(colorChoise(generateNumber));
  }
  console.log(arraySequence);
}

//Takes in numbers 1, 2, 3, 4, then converts it to red, green, blue yellow.
function colorChoise(number){
  switch (number) {
    case 1:
      return "red";
      break;

    case 2:
      return "green";
      break;

    case 3:
      return "blue";
      break;

    case 4:
      return "yellow";
      break;
  }
}

//triggered when div is clicked on to.
function clickAction(){
  //push selected element id in to playerInsert array.
  playerInsert.push(this.id);
  colorChanger(this.id);
  console.log(playerInsert);
  //if statment to check if the user has inserted the right amount of number in to game.
  if(playerInsert.length == numberFlash){
    //Check for errors.
    errorFound = checkForError(arraySequence, playerInsert);
    //If there was no mistake, create a new level.
    if(errorFound == false){
      createLevel();
    }
    else{
      if(player == 1){
        $('#updatingTXT1').text("Player 2 wins");
      }
      else{
        $('#updatingTXT1').text("Player 1 wins");
      }
    }
  }
}

//compare the computer generated array with the array created by player.
function checkForError(computerInsert, playerInsert){
  //So far no errors detected.
  var foundError = false;
  //For loop to chech each element of the array.
  for (var i = 0; i < computerInsert.length; i++) {
    //If the input is not the same as the computer generation, made error as true.
    if(computerInsert[i] != playerInsert[i]){
      foundError = true;
      break;
    }
  }
  return foundError;
}

function colorChanger(div){
  switch (div) {
    case "red":
      $("#red").css('background-color', 'red');
      break;
    case "blue":
      $("#blue").css('background-color', 'blue');
      break;
    case "green":
      $("#green").css('background-color', 'green');
      break;
    case "yellow":
      $("#yellow").css('background-color', 'yellow');
      break;
  }
  setInterval(function(){
    $("#" + div + "").css('background-color', 'white');

  }, 500);
}
